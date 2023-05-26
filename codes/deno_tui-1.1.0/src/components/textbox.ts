// Copyright 2022 Im-Beast. All rights reserved. MIT license.

import { ComponentEventMap, PlaceComponentOptions } from "../component.ts";
import { BoxComponent } from "./box.ts";
import { EmitterEvent } from "../event_emitter.ts";

import { insertAt } from "../utils/strings.ts";
import { clamp } from "../utils/numbers.ts";

import type { EventRecord } from "../event_emitter.ts";

/** Interface defining object that {TextboxComponent}'s constructor can interpret */
export interface TextboxComponentOptions extends PlaceComponentOptions {
  /** Whether texbox should allow new lines */
  multiline?: boolean;
  /** Whether textbox value should be starred ("*") */
  hidden?: boolean;
  /** Current value of textbox */
  value?: string;
}

/** Complementary interface defining what's accessible in {TextboxComponent} class in addition to {TextboxComponentOptions} */
export interface TextboxComponentPrivate {
  multiline: boolean;
  hidden: boolean;
  value: string;
}

/** Implementation for {TextboxComponent} class */
export type TextboxComponentImplementation = TextboxComponentOptions & TextboxComponentPrivate;

/** EventMap that {TextboxComponent} uses */
export type TextboxComponentEventMap = ComponentEventMap & {
  valueChange: EmitterEvent<[TextboxComponent<EventRecord>]>;
};

/**
 * Component that allows user to input text.
 * It implements most important ways to manipulate inputting text e.g.:
 *  - Arrows - Move cursor in specified direction
 *  - Return – Create new line
 *  - Home/End - Go to the start/end of the line
 *  - PgUp/PgDown - Go to the start/end of the text input
 *  - Delete/Backspace - Delete preceding/subsequent character
 */
export class TextboxComponent<
  EventMap extends EventRecord = Record<never, never>,
> extends BoxComponent<EventMap & TextboxComponentEventMap> implements TextboxComponentImplementation {
  #value: string[] = [];

  cursorPosition: {
    x: number;
    y: number;
  };
  multiline: boolean;
  hidden: boolean;

  constructor(options: TextboxComponentOptions) {
    super(options);
    this.multiline = options.multiline ?? false;
    this.hidden = options.hidden ?? false;
    this.value = options.value ?? "";
    this.cursorPosition = { x: this.#value.at(-1)?.length ?? 0, y: this.#value.length - 1 ?? 0 };

    this.on("keyPress", (keyPress) => {
      const { key, ctrl, meta } = keyPress;

      if (ctrl || meta) return;

      let { x, y } = this.cursorPosition;

      if (key.length === 1) {
        this.#value[y] = insertAt(this.#value[y], x, key);
        ++x;
      } else {
        switch (key) {
          case "space":
            this.#value[y] = insertAt(this.#value[y], ++x, " ");
            break;
          case "tab":
            this.#value[y] = insertAt(this.#value[y], ++x, "\t");
            break;
          case "home":
            x = 0;
            break;
          case "end":
            x = this.#value[y].length;
            break;
          case "up":
            x = Math.min(x, this.#value[--y]?.length ?? 0);
            break;
          case "down":
            x = Math.min(x, this.#value[++y]?.length ?? 0);
            break;
          case "left":
            x = Math.max(x - 1, 0);
            break;
          case "right":
            x = Math.min(x + 1, this.#value[y].length);
            break;
          case "backspace":
            if (x > 0) {
              this.#value[y] = this.#value[y].slice(0, x - 1) +
                this.#value[y].slice(x);
              --x;
            }
            break;
          case "delete":
            this.#value[y] = this.#value[y].slice(0, x) +
              this.#value[y].slice(x + 1);
            break;
          case "return":
            if (!this.multiline) break;

            if (x === this.#value[y].length) {
              ++y;
            } else {
              this.#value.splice(y, 1, this.#value[y].slice(0, x), this.#value[y].slice(x));
              ++y;
              x = 0;
            }
            break;
        }
      }

      this.#value[y] ||= "";
      y = clamp(y, 0, this.#value.length);
      x = clamp(x, 0, this.#value[y].length);

      this.cursorPosition = { x, y };

      this.emit("valueChange", this);
    });
  }

  get value(): string {
    return this.#value.join("\n");
  }

  set value(value: string) {
    const split = value.split("\n");
    this.#value = this.multiline ? split : [split.join("")];
  }

  draw(): void {
    const { value } = this;

    super.draw();

    if (!value) return;

    const { style } = this;
    const { canvas } = this.tui;
    const { column, row, width, height } = this.rectangle;
    const { x, y } = this.cursorPosition;

    const offsetX = Math.max(x - width + 1, 0);
    const offsetY = Math.max(y - height + 1, 0);

    for (const [i, line] of this.#value.entries()) {
      if (i < offsetY) continue;
      if (i - offsetY >= height) break;

      const lineText = line.slice(offsetX, offsetX + width);

      canvas.draw(
        column,
        row + i - offsetY,
        style(this.hidden ? "*".repeat(lineText.length) : lineText),
      );
    }

    if (this.state === "base") return;

    canvas.draw(
      column + Math.min(x, width - 1),
      row + Math.min(y, height - 1),
      style("\x1b[7m" + (this.#value[y][x] ?? " ") + "\x1b[0m"),
    );
  }

  interact(): void {
    this.state = "focused";
  }
}

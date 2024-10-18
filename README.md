# markii.js

> A lightweight, fast browser library to mimic the `<marquee>` elements of yesteryear

## Why?

The `<marquee>` element, originating as a non-standard feature of Internet Explorer, was never codified into the HTML
spec. [Most browsers still support `<marquee>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/marquee#browser_compatibility),
however, support is not, and will never be guaranteed.

In our modern times, newer, _standardized_ features of JS and CSS have removed the need for a `<marquee>` element, and,
along with accessibility conerns, there are many better ways to implement "an element that scrolls its content."

**markii.js** was created with the following goals:

- mimic the behaviour of `<marquee>` elements (extending the idea where possible)
- require no boilerplate - instead of JS, **markii.js** can look for `data-marquee` attributes.
- exist alongside frameworks (or a lack-thereof) without incompatibilities
- gracefully fail when no JavaScript is present

## Installation

... TODO ...

## Usage

... TODO - better ...

To apply the marquee effect to an element on your page, apply the `data-marquee-y` attribute with a value between 1.0
and 0.0:

```html

<div data-marquee-y="0.1">
    <p>HELLO! HELLO! HELLO!</p>
</div>
```

Ensure that the `p` doesn't fill the entire size of the container - `width: min-content` and `height: min-content` will
be useful here.

After you've applied your `data-marquee-y` property, ensure `markii.js` is important somewhere on the page and enjoy
your marquees!

## Contributing

... TODO ...

## Acknowledgements

... TODO ...
# Form Builder

Build a form in the browser, fill it in, and each save adds a row to a table below. Plain HTML, CSS, and JavaScript. No framework, no build step, no server.

## What it does

Press add text field or add select field. A small modal asks for the name, and for a select, a comma separated list of options. The field appears in the form.

Press save and the current values become a new row in the table.

Add a field after you already have rows, and the table grows a column. Old rows get a dash in the new spot, so the grid stays square.

## How it works

One class, `FormBuilder`. It grabs every element it needs in the constructor and wires the buttons there, so all the listeners sit in one place.

Two arrays hold the state. `fields` is every field ever added. `pendingNewFields` is only the ones added since the last save, which is what tells the table how many columns to grow before the row goes in.

Everything is built with `createElement`. No innerHTML, so nothing typed into a field can run as markup.

## Files

```
index.html   the page and the modal
script.js    the whole thing
styles.css   a few styles on top of Tailwind
```

Tailwind comes from a CDN in the html.

## Run it

Open `index.html` in a browser. That is all.

## Note

Nothing is stored. Reload and the form and the table are empty again.

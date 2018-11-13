## 1. Overview

![img](https://codelabs.developers.google.com/codelabs/polymer-maps/img/197fe633cb7e48b0.png)

In this codelab, You'll create a fully working Google Maps app using elements in Polymer's [Google Web Components](https://elements.polymer-project.org/browse?package=google-web-components) collection. The app will be responsive and will include driving directions and transit mode. Along the way, you'll also learn about Polymer's data-binding features and [iron element](https://elements.polymer-project.org/browse?package=iron-elements) set.

### What you'll learn

- How to start a new Polymer-based project using Chrome Dev Editor
- How to use elements in Polymer's iron, paper, and Google Web Component sets.
- How to use Polymer's data binding features to reduce boilerplate code.

### What you'll need

- Basic understanding of HTML, CSS, and web development.
- Install [Chrome Dev Editor](https://chrome.google.com/webstore/detail/chrome-dev-editor-develop/pnoffddplpippgcfjdhbmhkofpnaalpg?hl=en) or use your own editor of choice.



## 2. Getting set up

## **Create a new project**

This codelab uses Chrome Dev Editor, a Chrome app IDE. If you don't have it installed yet, please install it from Chrome Web Store.

[Download Chrome Dev Editor](https://chrome.google.com/webstore/detail/chrome-dev-editor-develop/pnoffddplpippgcfjdhbmhkofpnaalpg?hl=en)

The first time you run Chrome Dev Editor it will ask you to setup your workspace environment.

Fire up Chrome Dev Editor and start a new project:

1. Click ![img](https://codelabs.developers.google.com/codelabs/polymer-maps/img/60a9ad448066c82d.png)to start a new project.
2. Enter **"PolymerMapsCodelab"** as the **Project name**.
3. In the **Project type** dropdown, select "JavaScript web app (using Polymer paper elements)".
4. Click the **Create** button.

![img](https://codelabs.developers.google.com/codelabs/polymer-maps/img/dd7e2c738d995c8a.png)

Chrome Dev Editor creates a basic scaffold for your Polymer app. In the background, it also uses [Bower](http://bower.io/) to download and install a list of dependencies (including the Polymer core library) into the `bower_components`/ folder. **Fetching the components may take some time if your internet connection is slow**. You'll learn more about using Bower in the next step.

Your folder structure should look like this:

```
PolymerMapsCodelab/
  bower_components/ <!-- installed dependencies from Bower -->
  bower.json  <!-- Bower metadata files used for managing deps -->
  index.html  <!-- your app -->
  main.js
  styles.css
```

## **Preview the app**

At any point, select the **index.html** file and hit the ![img](https://codelabs.developers.google.com/codelabs/polymer-maps/img/6b0b8b0a2c7e82ad.png) button in the top toolbar to run the app. Chrome Dev Editor fires up a web server and navigates to the index.html page. This is a great way to preview changes as you make them.

![img](https://codelabs.developers.google.com/codelabs/polymer-maps/img/944899b3f43f3067.png)



## 3. Using google-map

The [Google Web Components](https://elements.polymer-project.org/browse?package=google-web-components) collection provides the `<google-map>` element for declaratively rendering a Google Map. To use it, you first need to install it using Bower.

**What is Bower?**

[Bower](http://bower.io/) is a client-side package management tool that can be used with any web app. When working with Polymer, it simplifies the hassles of dependency management. Every component defines its own set of dependencies. When you use Bower to install a component, the component's dependencies are installed alongside it under `bower_components/`.

## **Install the google-map element**

Chrome Dev Editor does not have a command line for running Bower commands. Instead, you need to manually edit `bower.json` to include `google-map`, then run Chrome Dev Editor's **Bower Update** feature. **Bower Update** checks the dependencies in `bower.json` and installs any missing ones.

**Installing dependencies from the command line?**

If you're not using Chrome Dev Editor or want to use the command line, run `bower install GoogleWebComponents/google-map --save` in your app's directory to install `<google-map>` and save it as a dependency.

1. Edit `bower.json` and add `google-map` to the `dependencies` object:

```json
"dependencies": {
  "iron-elements": "PolymerElements/iron-elements#^1.0.0",
  "paper-elements": "PolymerElements/paper-elements#^1.0.1",
  "google-map": "GoogleWebComponents/google-map#^1.1.3"
}
```

1. Right-click the `bower.json` filename in the editor.
2. Select **Bower Update** from the context menu.

![img](https://codelabs.developers.google.com/codelabs/polymer-maps/img/14fb2e7a4468b6a.png)

The download may take a few seconds. You can verify that `<google-map>` (and any dependencies) was installed by checking that `bower_components/google-map/` was created and populated.

## **Obtain a Maps API key**

To use the map element, you'll need to obtain an API key for the Google Maps API. Visit <https://developers.google.com/maps/documentation/javascript/get-api-key> and copy your key. We'll use it in the next step.

### Use Google Cloud Platform

- [ ] Create a Google Cloud Platform project
- [ ] Activate the Google Maps API



## **Use the google-map element**

To employ `<google-map>`, you need to:

1. Use an [HTML Import](http://www.html5rocks.com/en/tutorials/webcomponents/imports/) to load it in `index.html`.
2. Declare an instance of the element on the page.

In `index.html`, **remove all other HTML imports in the** **<head>** (leave the stylesheet, we'll use it later) and replace them with a single import that loads `google-map.html`:

### index.html

```html
<head>
  ....
  <script src="bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
  <link rel="import" href="bower_components/google-map/google-map.html">

  <link rel="stylesheet" href="styles.css">
</head>
```

**Important**: all imports need to come **after** `webcomponents-lite.min.js` so the polyfill can properly load them.

Next, replace the contents of `<body>` with an instance of `<google-map>`:

### index.html

```html
<body unresolved>
  <google-map latitude="37.779" longitude="-122.3892" zoom="13"
      api-key="YOUR_KEY"></google-map>
</body>
```

As you can see, using `<google-map>` is completely declarative! The map is centered using the `latitude` and `longitude` attributes and its zoom level is set by the `zoom` attribute. We've also specified our API key for the Maps API using the `api-key` attribute.

### **Style the map**

If you run the app right now, nothing will display. In order for the map to properly display itself, you need to set its container (in this case, `<body>`) to have a fixed height.

Open `styles.css` and replace its contents with default styling:

### styles.css

```css
body, html {
  font-family: 'Roboto', Arial, sans-serif;
  height: 100%;
  margin: 0;
}
```

### Add **a marker**

`<google-map>` supports adding map markers to the map by declaring `<google-map-marker>` elements as children. The marker locations are also set using `latitude` and `longitude` attributes.

Back in **index.html**, add a draggable `<google-map-marker>` to the map:

### index.html

```html
<google-map latitude="37.779" longitude="-122.3892"
    api-key="YOUR_KEY" zoom="13" disable-default-ui>
  <google-map-marker latitude="37.779" longitude="-122.3892"
      title="Go Giants!" draggable="true"></google-map-marker>
</google-map>
```

Notice that we've also disabled the map's controls by setting `disableDefaultUi` to true. Since it's a boolean property, its presence as an HTML attribute makes it truthy.

## **Run the app**

If you haven't already done so, hit the ![img](https://codelabs.developers.google.com/codelabs/polymer-maps/img/6b0b8b0a2c7e82ad.png) button. At this point, you should see a map that takes up the entire viewport and has a single marker pin.

![img](https://codelabs.developers.google.com/codelabs/polymer-maps/img/bc91a8850a10582c.png)

### **Frequently Asked Questions**

- [Where are the reference docs for Google Map element](https://elements.polymer-project.org/elements/google-map)?

## 4. Add driving directions

The `<google-map-directions>` element was installed alongside `<google-map>`. It provides driving direction information using the Google Maps API.

## Use the google-map-directions element

To employ `<google-map-directions>`:

1. Use an HTML Import to load it in `index.html`.
2. Declare an instance of the element on the page.
3. "Connect" it to the map.

In `index.html`, add an HTML Import for `google-map-directions.html`:

### index.html

```html
<head>
  ....
  <script src="bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
  <link rel="import" href="bower_components/google-map/google-map.html">
  <link rel="import" href="bower_components/google-map/google-map-directions.html">
</head>
```

Declare `<google-map-directions>` as a sibling of `<google-map>`. Set its `start-address` attribute to "**San Francisco**" and the `end-address` to "**Mountain View**".

### index.html

```html
<body unresolved>
  <google-map latitude="37.779" longitude="-122.3892"
      api-key="YOUR_KEY" zoom="13" disable-default-ui>
    ...
  </google-map>
  <google-map-directions
      start-address="San Francisco"
      end-address="Mountain View"
      api-key="YOUR_KEY"></google-map-directions>
</body>
```

## **Hooking up directions to the map**

`<google-map-directions>` fetches directions, but it isn't that useful by itself. You need to connect the results from `<google-map-directions>` to `<google-map>` so the directions render on the map.

Both elements expose a `.map` property that allow users to access/set an underlying `Map` object (used by the Google Maps JavaScript API). To get these two elements talking, set them to use the same `Map` object.

At the bottom of **index.html**, set the directions element to share the map:

**index.html**

```html
...

<script>
  var gMap = document.querySelector('google-map');
  gMap.addEventListener('api-load', function(e) {
    document.querySelector('google-map-directions').map = this.map;
  });
</script>
</body>
```

**Note**: Waiting until the map element fires its api-load event ensures that the map has been loaded.

**Wait, you said no code!**

This step illustrated how you can configure an element using its events and properties. In the next step, you'll remove the code in favor of Polymer's declarative data binding features.

## **Run the app**

Hit the ![img](https://codelabs.developers.google.com/codelabs/polymer-maps/img/6b0b8b0a2c7e82ad.png) button! At this point, you should see the map, a marker, and added driving directions between **San Francisco**and **Mountain View**.

![img](https://codelabs.developers.google.com/codelabs/polymer-maps/img/c787a2cd69d7263b.png)

## **Next up**

Learn Polymer's data-binding features and allow users to input their own start and end addresses.





## 5. Add address inputs

Let's add input fields to allow users to input the start and end addresses. Polymer provides several elements for working with input: `paper-card, paper-item, paper-input`, `iron-icon`, and `iron-icons`.

In **index.html**, add new HTML Imports for these components:

### index.html

```html
<head>
  ....
  <link rel="import" href="bower_components/iron-icon/iron-icon.html">
  <link rel="import" href="bower_components/iron-icons/iron-icons.html">
  <link rel="import" href="bower_components/paper-item/paper-item.html">
  <link rel="import" href="bower_components/paper-item/paper-icon-item.html">
  <link rel="import" href="bower_components/paper-input/paper-input.html">
  <link rel="import" href="bower_components/paper-card/paper-card.html">
</head>
```

At the bottom of the page, declare two `<paper-icon-item>` elements and a material design input for the start and end addresses. `<paper-icon-item>` is a convenience element for making an item with an icon.

```html
<paper-icon-item>
  <paper-input label="Start address" value="San Francisco"></paper-input>
</paper-icon-item>
<paper-icon-item>
  <paper-input label="End address" value="Mountain View"></paper-input>
</paper-icon-item>
```

### **Add search icons**

`<iron-icon>` is an element useful for displaying an icon. It takes an `icon` attribute, which references an icon from Polymer's default [icon sets](https://elements.polymer-project.org/elements/iron-icons?view=demo:demo/index.html).

1. Inside each item add an `<iron-icon>` element.
2. Set the `icon` attribute to `icon="search"`.

```html
<paper-icon-item>
  <iron-icon icon="search" item-icon></iron-icon>
  <paper-input label="Start address" value="San Francisco"></paper-input>
</paper-icon-item>
<paper-icon-item>
  <iron-icon icon="search" item-icon></iron-icon>
  <paper-input label="End address" value="Mountain View"></paper-input>
</paper-icon-item>
```

**Important**: Be sure to include the `item-icon` attribute on each `<iron-icon>`. This tells the `<paper-icon-item>` which child element it should use as the icon.

### **Add a material design card**

Wrapping our inputs in a [material design](https://www.google.com/design/spec/components/cards.html) `<paper-card>` is a great way to highlight this part of the app.

```html
<paper-card elevation="2"> <!-- elevation controls the amount of box shadow -->
  <paper-icon-item>
    ...
  </paper-icon-item>
  <paper-icon-item>	
    ...
  </paper-icon-item>
</paper-card>
```

In **styles.css**, add default styling to the card so it displays in the lower left corner, above the map.

### styles.css

```css
paper-card {
  position: absolute;
  bottom: 25px;
  left: 25px;
  z-index: 1;
}
```

![img](https://codelabs.developers.google.com/codelabs/polymer-maps/img/7d15d713a9f100d9.png)

## **Next up**

Use Polymer's data binding features to drive the driving directions from the address inputs.



## 6. Data binding the user's search

In the last step, we created search inputs for the driving directions. In this step of the codelab, we'll hook them up to power `<google-map-directions>`.

## **Use data-binding outside of Polymer**

Polymer's [data-binding features](https://www.polymer-project.org/1.0/docs/devguide/data-binding.html) are only available when creating a `<dom-module>`. However, Polymer provides a [type-extension](http://www.html5rocks.com/en/tutorials/webcomponents/customelements/#typeextension) version of the `<template>` element named ["dom-bind"](https://www.polymer-project.org/1.0/docs/devguide/templates.html#dom-bind). Essentially, it allows you to use Polymer sugaring features outside of Polymer. For example, it allows you to use `{{}}` bindings with elements in your main page.

Properties defined on an `<template is="dom-bind">` can be data bound. For example:

```html
<template is="dom-bind" id="t">
  <!-- Hello, Eric. How are you today? -->
  Hello, <span>{{name}}</span>. <span>{{greeting}}</span>
</template>

<script>
  var t = document.querySelector('#t');
  t.name = 'Eric';
  t.greeting = 'How are you today?';
</script>
```

Would bind the `name` and `greeting` properties to the values assigned on the template.



## **Data-bind the map ↔ directions element**

In the last step, you wrote JavaScript to set the direction's `map` property:

```javascript
document.querySelector('google-map-directions').map = this.map;
```


Both the maps and directions elements [declare](https://www.polymer-project.org/1.0/docs/devguide/properties.html) a `map` property in their `properties` object. This means you can use an **attribute** of the same name to data-bind the the two **properties** together.

**Note:** when data binding to an element's properties, the attribute name is lower case and "-" separated instead of camelCased. See [attribute to property mappings](https://www.polymer-project.org/1.0/docs/devguide/properties.html#property-name-mapping) in the Polymer documentation.

1. In **index.html**, remove the `<script>` you added in Step 4.
2. Wrap the existing markup in `<body>`inside a `<template is="dom-bind">`.
3. Bind the `map` attribute of `<google-map>` to the `map` attribute of `<google-map-directions>`. Make sure this is done inside `<template is="dom-bind">`. This will bind the elements' `map` properties together. When one changes, the other will too.

```html
<template is="dom-bind">
  <google-map map="{{map}}" ...></google-map>
  <google-map-directions map="{{map}}"...></google-map-directions>
</template>
```

**Note**: We've used `{{map}}` as the binding property name, but you can use whatever name you like (for example, `map="{{foo}}")`.

## **Data-bind the address inputs ↔ directions element**

Right now, the `startAddress` and `endAddress` properties are hardcoded to **"San Francisco"** and **"Mountain View"**, respectively.

```html
<google-map-directions
    start-address="San Francisco" end-address="Mountain View"
    api-key="YOUR_KEY">
</google-map-directions>
```


Likewise, the address inputs are hardcoded:

```html
<paper-input label="Start address" value="San Francisco"></paper-input>
<paper-input label="End address" value="Mountain View"></paper-input>
```

We can make things more dynamic by binding these inputs to the attributes of the `<google-map-directions>`.

Bind the `startAddress` and `endAddress` to the `value` of the appropriate input:

### index.html

```html
<template is="dom-bind">
    
<google-map map="{{map}}" latitude="37.779" longitude="-122.3892"
    api-key="YOUR_KEY" disable-default-ui zoom="13">
  <google-map-marker latitude="37.779" longitude="-122.3892"
      title="Go Giants!" draggable="true"></google-map-marker>
</google-map>

<google-map-directions map="{{map}}"
    start-address="{{start}}"
    end-address="{{end}}"
    api-key="YOUR_KEY"></google-map-directions>

<paper-card elevation="2">
  <paper-icon-item>
    <iron-icon icon="search" item-icon></iron-icon>
    <paper-input label="Start address" 
                 value="{{start}}"></paper-input>
  </paper-icon-item>
  <paper-icon-item>
    <iron-icon icon="search" item-icon></iron-icon>
    <paper-input label="End address"
                 value="{{end}}"></paper-input>
  </paper-icon-item>
</paper-card>

</template>
```

The name you use in each `{{}}` doesn't matter, as long as the binding names match for each pair of properties you want to bind together.

## **Run the app**

1. Hit the ![img](https://codelabs.developers.google.com/codelabs/polymer-maps/img/6b0b8b0a2c7e82ad.png) button.
2. Enter **CA** for the start address.
3. Enter **NYC** for the end address.

You should see the map update itself with driving directions from **California** to **New York**:

![img](https://codelabs.developers.google.com/codelabs/polymer-maps/img/5274c184bd1d05e0.png)

Try entering other destinations! You should see the map update as new destinations are entered.

### index.html

```html
<body>
  <template is="dom-bind">
    
    <google-map map="{{map}}" latitude="37.779"
        longitude="-122.3892" api-key="YOUR_KEY"
        disable-default-ui zoom="13">
      <google-map-marker latitude="37.779" longitude="-122.3892"
          title="Go Giants!" draggable="true"></google-map-marker>
    </google-map>

    <google-map-directions map="{{map}}"
        start-address="{{start}}"
        end-address="{{end}}"
        api-key="YOUR_KEY"></google-map-directions>

    <paper-card elevation="2">
      <paper-icon-item>
        <iron-icon icon="search" item-icon></iron-icon>
        <paper-input label="Start address" 
                     value="{{start}}"></paper-input>
      </paper-icon-item>
      <paper-icon-item>
        <iron-icon icon="search" item-icon></iron-icon>
        <paper-input label="End address"
                     value="{{end}}"></paper-input>
      </paper-icon-item>
    </paper-card>

  </template>

</body>
```

## **Next up**

Allow users to select the type of directions (walking, transit, driving).



## 7. Changing the form of travel

## **Import the components for this step**

In **index.html**, add the following HTML Imports to the `<head>`:

### index.html

```html
<head>
  ....
  <link rel="import" href="bower_components/iron-icons/maps-icons.html">
  <link rel="import" href="bower_components/paper-tabs/paper-tabs.html">
</head>
```

**Note:** `maps-icons` is required to load Polymer's [map iconset](https://elements.polymer-project.org/elements/iron-icons?view=demo:demo/index.html). You'll use it later to render icons for the travel modes.

## **Creating a travel mode selector**

We'll use `<paper-tabs>` to allow users to select their travel type. Each transit mode will also use an icon from the `maps` icon set instead of the default one. To use one of the other icon sets, the `icon` attribute takes the form: `<iconset>:<name>`, where `<iconset>` is the name of the icon set (e.g. "maps") and `<name>` is the name of the icon from that set.

As an example, the following code places the `directions-car` icon from the `maps` icon set:

```html
<iron-icon icon="maps:directions-car" item-icon></iron-icon>
```

The `<google-map-directions>` element contains a `travelMode` property for specifying

the type of directions to render. It has four possible values: "**DRIVING**", "**WALKING**", "**BICYCLING**", and "**TRANSIT**".

1. In **index.html** within the `<paper-card>` container, add a `<paper-tabs>` with the travel mode options.
2. For each type of transit mode, add an `<iron-icon>` and `<span>` containing helper text.

### index.html

```html
<paper-card elevation="2">
...

<!-- selected="0" selects the first item in the tab list.
     Change it to another index if you want a different default. -->
<paper-tabs selected="0">
  <paper-tab>
    <iron-icon icon="maps:directions-car"></iron-icon>
    <span>DRIVING</span>
  </paper-tab>
  <paper-tab>
    <iron-icon icon="maps:directions-walk"></iron-icon>
    <span>WALKING</span>
  </paper-tab>
  <paper-tab>
    <iron-icon icon="maps:directions-bike"></iron-icon>
    <span>BICYCLING</span>
  </paper-tab>
  <paper-tab>
    <iron-icon icon="maps:directions-transit"></iron-icon>
    <span>TRANSIT</span>
  </paper-tab>
</paper-tabs>

</paper-card>
```

## Styling the tab strip

`<paper-tabs>` is styled by default. It has a yellow material design ink effect and selection bar indication the selected tab. We can make it nicer!

Polymer uses [CSS custom properties](https://www.polymer-project.org/1.0/docs/devguide/styling.html#xscope-styling-details) to expose styling hooks for internal parts of a component's Shady DOM. For example, [paper-tabs](https://elements.polymer-project.org/elements/paper-tabs) exposes `--paper-tabs-selection-bar-color` to colorize the tab's selection bar.

CSS custom properties are coming natively to browsers. Until they do, Polymer provides [``](https://www.polymer-project.org/1.0/docs/devguide/styling.html#custom-style), a custom element that extends the `<style>` tag and teaches it the custom properties styling system. To use this element, define it in the `<head>` of your main page:

### index.html

```html
<head>
  ...
  <style is="custom-style">
    paper-tabs {
      --paper-tabs-selection-bar-color: #0D47A1;
      margin-top: 16px;
    }
    paper-tab {
      --paper-tab-ink: #BBDEFB;
    }

    /* Other styles that make things more pleasant.
       These could instead be added in styles.css since they
       do not use any Polymer styling features. */
    paper-tab iron-icon {
      margin-right: 10px;
    }
    paper-tab.iron-selected {
      background: rgb(66, 133, 244);
      color: white;
    }
  </style>
</head>
```

This bit of code will colorize the selection bar and ink ripple effect a nice [material design blue](https://www.google.com/design/spec/style/color.html#color-color-palette).

**Note:** you can read up on [paper-tabs](https://elements.polymer-project.org/elements/paper-tabs) and [paper-tab](https://elements.polymer-project.org/elements/paper-tabs?active=paper-tab) styling hooks in their element documentation pages.

![img](https://codelabs.developers.google.com/codelabs/polymer-maps/img/69c6ee0158b29da.png)

## **Data-bind the travel mode selector ↔ directions element**

The last thing you need to do is data-bind the `travelMode` property of `<google-map-directions>` to `<paper-tabs>`'s `.selected` property. The tabs updates this property whenever a new child item is selected. By default, its set to the index of the selected item. We need to override this in order to bind to the string value of each direction type. The `attr-for-selected` property does just that.

Bind the direction's `travelMode` property to the tab's `selected` property:

### index.html

```html
<google-map-directions map="{{map}}" api-key="YOUR_KEY"
      start-address="{{start}}"
      end-address="{{end}}"
      travel-mode="[[travelMode]]"></google-map-directions>
...

<paper-card>

<paper-tabs selected="{{travelMode}}" attr-for-selected="label">
  <paper-tab label="DRIVING">
    <iron-icon icon="maps:directions-car"></iron-icon>
    <span>DRIVING</span>
  </paper-tab>
  <paper-tab label="WALKING">
    <iron-icon icon="maps:directions-walk"></iron-icon>
    <span>WALKING</span>
  </paper-tab>
  <paper-tab label="BICYCLING">
    <iron-icon icon="maps:directions-bike"></iron-icon>
    <span>BICYCLING</span>
  </paper-tab>
  <paper-tab label="TRANSIT">
    <iron-icon icon="maps:directions-transit"></iron-icon>
    <span>TRANSIT</span>
  </paper-tab>
</paper-tabs>

</paper-card>
```

**Note:** We've also stuck `label` attributes on each `<paper-tab>`. When a new item is selected, `<paper-tabs>`sets its `selected` property to the value of this attribute on the selected child. The name `label` is set in `attr-for-selected="label".`

## **Run the app**

1. Hit the ![img](https://codelabs.developers.google.com/codelabs/polymer-maps/img/6b0b8b0a2c7e82ad.png) button.
2. Enter **SF** for the start address.
3. Enter **Oakland, CA** for an end address.
4. Click the different modes of travel.

The map should automatically update to show different forms of travel:

![img](https://codelabs.developers.google.com/codelabs/polymer-maps/img/473ccbd46c694eb5.png)



## 8. That's all folks!

You built an entire maps application complete with driving directions, and all without writing a single line of code!

**Think about that for a second**. This just goes to show you the power of web components. They're reusable and composable. Zest in Polymer's data-binding features and you can create an entire app using nothing but declarative markup.

## What you've learn**ed**

- How to start a new Polymer-based project using Chrome Dev Editor.
- How to use elements in Polymer's iron, paper, and Google Web Component sets.
- How to use Polymer's styling system and CSS custom properties to style the internal styling hooks a component specifies.
- How to use Polymer's data binding features to reduce boilerplate code.

## **Learn More**

### **Polymer**

- [polymer-project.org](https://www.polymer-project.org/1.0/)
- [Iron element](https://elements.polymer-project.org/browse?package=iron-elements) documentation
- [Paper element](https://elements.polymer-project.org/browse?package=paper-elements) documentation
- [Polymer tag](http://stackoverflow.com/questions/tagged/polymer) on Stack Overflow

### Other

- [Google Web Components](https://elements.polymer-project.org/browse?package=google-web-components) documentation
- [webcomponents.org](http://webcomponents.org/)
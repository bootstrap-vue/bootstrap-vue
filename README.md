# Bootstrap Vue
[Twitter Bootstrap 4](https://v4-alpha.getbootstrap.com/) Components For [Vue.js 2](https://vuejs.org/)

[![NPM](https://nodei.co/npm/bootstrap-vue.png?downloads=true&downloadRank=true&stars=true)](https://npmjs.com/bootstrap-vue/)

<p align="center"><img src="./banner.png"></p>

## Quick Start

Install via **NPM**:   

```npm i --save-dev bootstrap-vue```

```js
import Vue from 'vue'

// Globally register bootstrap-vue components
import {setup} from 'bootstrap-vue';
setup(Vue);
````

*Note: You will need **Babel Loader** in your Webpack config file to support ES6 syntax.
You can then use component in your html, like so:
```html
<b-alert>Hello</b-alert>
```

## Components

### Accordion
Extend the default collapse behavior to create an accordion. It requires both <code>target</code> and <code>target-group</code> attributes for this to work.

#### Usage
```html
<!-- item 1 -->
<b-collapse-toggle target="item-1" target-group="accordion-1">
  <div><a href="#">Collapsible Group Item #1</a></div>
</b-collapse-toggle>
<b-collapse id="item-1" group="accordion-1">
  <div class="card card-block">
    <h5>First</h5>
    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  </div>
</b-collapse>

<!-- item 2 -->
<b-collapse-toggle target="item-2" target-group="accordion-1">
  <div><a href="#">Collapsible Group Item #2</a></div>
</b-collapse-toggle>
<b-collapse id="item-2" group="accordion-1">
  <div class="card card-block">
    <h5>Second</h5>
    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  </div>
</b-collapse>

<!-- item 3-->
<b-collapse-toggle target="item-3" target-group="accordion-1">
  <div><a href="#">Collapsible Group Item #3</a></div>
</b-collapse-toggle>
<b-collapse id="item-3" group="accordion-1">
  <div class="card card-block">
    <h5>Third</h5>
    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  </div>
</b-collapse>
```

### Alert
Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages.

#### Usage
```html
<b-alert 
  :show="showVariable"
  :state="state"
  dismissible>
  This is an alert
</b-alert>
```

### Breadcrumb
Indicate the current page’s location within a navigational hierarchy.

#### Usage
```html
<b-breadcrumb 
  :list: "[{text: 'Home', link: '#', active: true}, {text: 'Library', active: false}]">
</b-breadcrumb>
```

### Button Checkbox
Allows to elect one or more items in the nested group of buttons.

#### Usage
```html
<b-button-checkbox 
  :model.sync="model"
  :list.sync=" [{
      text: 'First',
      value: 'first',
    }, {
      text: 'Second',
      value: 'second',
    }, {
      text: 'Third',
      value: 'third',
    }]"
  size="md"
  variant="primary"
  return-object>
</b-button-checkbox>
```

### Button Group
Group a series of buttons together on a single line with the button group.

#### Usage
```html
<b-button-group vertical>
  <b-button>Left</b-button>
  <b-button>Middle</b-button>
  <b-button>Right</b-button>
</b-button-group>
```

### Button Radio
Allows to select only one item out of a group of buttons.

#### Usage
```html
<b-button-radio 
  :model.sync="model"
  :list="[{
      text: 'First',
      value: 'first',
    }, {
      text: 'Second',
      value: 'second',
    }, {
      text: 'Third',
      value: 'third',
    }]"
  size="md"
  variant="primary"
  return-boject>
</b-button-radio>
```

### Buttons
Use Bootstrap’s custom button styles for actions in forms, dialogs, and more. Includes support for a handful of contextual variations, sizes, states, and more.

#### Usage
```html
<!-- colour variants -->
<b-btn size="md" variant="primary">Primary</b-btn>
<b-btn size="md" variant="secondary">Secondary</b-btn>
<b-btn size="md" variant="success">Success</b-btn>
<b-btn size="md" variant="warning">Warning</b-btn>
<b-btn size="md" variant="danger">Danger</b-btn>

<!-- outlined variants -->
<b-btn size="md" variant="primary-outline">Primary</b-btn>
<b-btn size="md" variant="secondary-outline">Secondary</b-btn>
<b-btn size="md" variant="success-outline">Success</b-btn>
<b-btn size="md" variant="warning-outline">Warning</b-btn>
<b-btn size="md" variant="danger-outline">Danger</b-btn>

<!-- button types -->
<b-btn size="md" variant="link" link="#">Button Link</b-btn>
<b-btn size="md" variant="primary" disabled>Disabled</b-btn>
<b-btn size="md" variant="primary" block>Block</b-btn>
```

### Card
A card is a flexible and extensible content container.

#### Usage
```html
<b-card variant="default" type="default" align="left">
  <img class="card-img img-fluid" src="https://placehold.it/350x150" alt="Card image cap">
  <div class="card-block">
    <h4 class="card-title">Card title</h4>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</b-card>
```

### Carousel

#### Usage
```html
<b-carousel :interval="5000" :controls="false" :indicators="false">
  <b-slide>
    <img src="http://placehold.it/1200x400?text=one">
  </b-slide>
  <b-slide>
    <img src="http://placehold.it/1200x400?text=two">
  </b-slide>
  <b-slide>
    <img src="http://placehold.it/1200x400?text=three">
  </b-slide>
</b-carousel>
```

### Collapse
Click the buttons below to show and hide another element. It requires either <code>target</code> or <code>target-group</code> attribute for this to work.

#### Usage
```html
<!-- triggers -->
<b-collapse-toggle target="collapse-1">
  <button class="btn btn-default">Toogle first</button>
</b-collapse-toggle>
<b-collapse-toggle target="collapse-2">
  <button class="btn btn-default">Toogle second</button>
</b-collapse-toggle>
<b-collapse-toggle target-group="group-1">
  <button class="btn btn-default">Toogle all</button>
</b-collapse-toggle>

<!-- item 1 -->
<b-collapse id="collapse-1" group="group-1">
  <div class="card card-block">
    <h5>First</h5>
    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  </div>
</b-collapse>

<!-- item 2 -->
<b-collapse id="collapse-2" group="group-1">
  <div class="card card-block">
    <h5>Second</h5>
    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  </div>
</b-collapse>
```

### Dropdown
Dropdowns are toggleable, contextual overlays for displaying lists of links.

#### Usage
```html
<b-dropdown 
  text="Action"
  size="md"
  variant="primary"
  :arrow="arrow"
  :caret="false"
  dropup>
  <ul class="dropdown-menu dropdown-menu-left">
      <li><a class="dropdown-item" href="#">Completed</a></li>
      <li><a class="dropdown-item" href="#">Pending</a></li>
  </ul>
</b-dropdown>
```

### Dropdown Select
Dropdown select allows to select an item from the list and update the model.

#### Usage
```html
<b-dropdown-select 
  :list="[
    {
      text: 'First',
      value: 'first',
    }, {
      text: 'Second',
      value: 'second',
    }, {
      text: 'Third',
      value: 'third',
    }]"
  :model.sync="model"
  size="md"
  variant="primary"
  position="left"
  default-text="Action"
  :force-default="false"
  :caret="false"
  dropup
  return-object>
</b-dropdown-select>
```

### Form Checkbox
A Checkbox input for selection of one or more items.

#### Usage
```html
<b-form-checkbox 
  :list.sync="[{
    text: 'First',
    value: 'first',
  }, {
    text: 'Second',
    value: 'second',
  }, {
    text: 'Third',
    value: 'third',
    disabled: true
  }]"
  :state="'default'"
  :custom="false"
  vertical
  return-object>
</b-form-checkbox>
```

### Form Input
A textual input.

#### Usage
```html
<b-form-input 
  :model.sync="model"
  type="text"
  label="Example Label"
  placeholder="Placeholder"
  description="We'll never share your email with anyone else."
  size="md"
  :state="'success'"
  state-icon>
</b-form-input>
```

### Form Radio
A radio input for selection of only one item.

#### Usage
```html
<b-form-radio 
  :model.sync="model"
  :list="[
    {
      name: 'First',
      value: 'first',
    }, {
      name: 'Second',
      value: 'second',
    }, {
      name: 'Third (disabled)',
      value: 'third',
      disabled: true,
    }]"
  :state="'success'"
  :custom="false"
  vertical
  return-object>
</b-form-radio>
```

### Form Select
A textual input.

#### Usage
```html
<b-form-select 
  :model.sync="model"
  :options="options"
  :default-option="{text: 'Please select one',value: 'default'}"
  type="text"
  label="Example Label"
  description="We'll never share your gender with anyone else."
  size="md"
  :state="'success'">
</b-form-select>
```

### Form textarea
A textarea input.

#### Usage
```html
<b-form-textarea 
  :model.sync="model"
  type="text"
  label="Example Label"
  description="Extra textarea description."
  rows="2"
  :state="'success'">
</b-form-textarea>
```

### Images
Opt your images into responsive behavior (so they never become larger than their parent elements) and add lightweight styles to them—all via classes.

#### Usage
```html
<img src="http://placehold.it/150x150?text=150x150" alt="..." class="img-rounded">
<img src="http://placehold.it/150x150?text=150x150" alt="..." class="img-circle">
<img src="http://placehold.it/150x150?text=150x150" alt="..." class="img-thumbnail">
<img src="http://placehold.it/1000x150?text=1000x150 - responsive" alt="..." class="img-fluid" >
```

### Jumbotron
A lightweight, flexible component that can optionally extend the entire viewport to showcase key marketing messages on your site.

#### Usage
```html
<b-jumbotron fluid>
  <h1 class="display-3">Hello, world!</h1>
  <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
  <hr class="m-y-md">
  <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
  <p class="lead">
    <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
  </p>
</b-jumbotron>
```

### List Group
List groups are a flexible and powerful component for displaying not only simple lists of elements, but complex ones with custom content.

#### Usage
```html
<b-list-group flush>
  <b-list-group-item state="success">
    <b-badge type="pill" class="pull-xs-right">14</b-badge>
    Cras justo odio
  </b-list-group-item>
  <b-list-group-item>
    <b-badge type="pill" class="pull-xs-right">2</b-badge>
    Dapibus ac facilisis in
  </b-list-group-item>
  <b-list-group-item>
    <b-badge type="pill" class="pull-xs-right">1</b-badge>
    Morbi leo risus
  </b-list-group-item>
</b-list-group>```

### Media
The media object is an abstract element used as the basis for building more complex and repetitive components (like blog comments, Tweets, etc).

#### Usage
```html
<b-media position="top left">
  <div slot="aside">
    <a href="#">
      <img class="media-object" src="http://placehold.it/50x50?text=media">
    </a>
  </div>
  <div slot="body">
    <h4 class="media-heading">Media heading</h4> 
    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
  </div>
</b-media>
```

### Modal
Modals are streamlined, but flexible, dialog prompts with the minimum required functionality and smart defaults.

#### Usage
```html
<!-- trigger -->
<b-button variant="primary" v-on:click="$broadcast('show::modal', 'modal1')">
  Show Modal
</b-button>

<!-- modal -->
<b-modal id="modal1" size="md" :fade="false">
  <div slot="modal-header">
    <h3>header</h3>
  </div>
  <div slot="modal-body">
    body
  </div>
  <div slot="modal-footer">
    <button class="btn btn-primary" v-on:click="$broadcast('hide::modal', 'modal1')">
      OK
    </button>
  </div>
</b-modal>
```

### Nav
Roll your own navigation style by extending the base .nav component.

#### Usage
```html
<b-nav type="default" :vertical="false">
  <b-nav-item link="#" active>Active</b-nav-item>
  <b-nav-item link="#">Link</b-nav-item>
  <b-nav-item link="#">Another Link</b-nav-item>
  <b-nav-item link="#" disabled>Disabled</b-nav-item>
</b-nav>```

### Navbar
The navbar is a simple wrapper for positioning branding, navigation, and other elements into a concise navigation header.

#### Usage
```html
<b-navbar fixed="top" type="light" variant="default" full>
  <a class="navbar-brand" href="#">Navbar</a>
  <b-nav type="navbar" class="pull-xs-left">
    <b-nav-item link="#" active>Home <span class="sr-only">(current)</span></b-nav-item>
    <b-nav-item link="#">Features</b-nav-item>
    <b-nav-item link="#">Pricing</b-nav-item>
    <b-nav-item link="#">About</b-nav-item>
  </b-nav>
  <form class="form-inline navbar-form pull-xs-right">
    <input class="form-control" type="text" placeholder="Search">
    <button class="btn btn-success-outline" type="submit">Search</button>
  </form>
</b-navbar>
```

### Pager
Quick previous and next links for simple pagination implementations with light markup and styles. It’s great for simple sites like blogs or magazines.

#### Usage
```html
<b-pager>
  <li><a href="#">Previous</a></li>
  <li><a href="#">Next</a></li>
</b-pager>
<hr>
<b-pager>
  <li class="pager-prev"><a href="#">Older</a></li>
  <li class="pager-next"><a href="#">Newer</a></li>
</b-pager>
```

### Pagination
Provide pagination links for your site or app with the multi-page pagination component.

#### Usage
```html
<b-pagination 
  size="md"
  variant="primary"
  :total-rows="100"
  :current-page="currentPageVariable"
  :per-page="10">
</b-pagination>
```

### Popover
Add small overlay content to any element for housing secondary information. Popover rely on on the 3rd party library <a href='http://github.hubspot.com/tether/'>tether</a> for positioning.

#### Usage
```html
<!-- tooltip with a text -->
<b-popover title="title" text="Lorem ipsum dolor." position="top">
  <button class="btn">popover top</button>
</b-popover>


<!-- tooltip with an html content -->
<b-popover title="title" position="right">
  <button class="btn">popover right (html)</button>
  <em slot="content">Lorem ipsum dolor.</em>
</b-popover>
```

### Progress
Provide up-to-date feedback on the progress of a workflow or action with simple yet flexible progress bars.

#### Usage
```html
<b-progress 
  variant="primary"
  value="25" 
  striped>
  25%
</b-progress>```

### Tables
For tabular data.

#### Usage
```html
<b-table hover responsive>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Username</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td colspan="2">Larry the Bird</td>
        <td>@twitter</td>
      </tr>
    </tbody>
  </table>
</b-table>
```

### Tabs

#### Usage
```html
<b-tabs size="md" :fade="false">
  <b-tab id="tab-1" title="Tab 1">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, quidem!</b-tab>
  <b-tab id="tab-2" title="Tab 2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, corporis?</b-tab>
  <b-tab id="tab-2" title="Tab 3" disabled>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit, architecto, maiores.</b-tab>
</b-tabs>
```

### Tags/Badges
Small and adaptive tag for adding context to just about any content.

#### Usage
```html
<b-badge variant="default" type="pill">open</b-badge>
```

### Tooltip
Add small overlay content to any element for housing secondary information. Tooltips rely on on the 3rd party library <a href='http://github.hubspot.com/tether/'>tether</a> for positioning.

#### Usage
```html
<!-- tooltip with a text -->
<b-tooltip 
  text="tooltip top" 
  position="top"
  :triggers="['hover']">
  <button class="btn">tooltip top</button>
</b-tooltip>

<!-- tooltip with an html content -->
<b-tooltip position="right">
  <button class="btn">tooltip right (html)</button>
  <em slot="content">tooltip right (italic)</em>
</b-tooltip>
```


## Demo [Coming Soon!]
Meanwhile, you can see demos from 1.x version docs from kzima,
 every thing is almost same except all tag prefixes are changed from `vs-*` to `b-*` :)
   [See here for 1.x Demo](http://kzima.github.io/vuestrap-base-components/#/accordion)

## /Bootstrap Vue
+ This Project and Docs was originally ported from vue 1.x version
 [kzima/vuestrap-base-components](https://github.com/kzima/vuestrap-base-components)
 , So original credit backs to him :)

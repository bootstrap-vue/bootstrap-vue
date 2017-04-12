# Media

>  The media object helps build complex and repetitive components where some media is positioned alongside content that doesn’t wrap around said media. Plus, it does this with only two required classes thanks to flexbox.

**Usage**

```html
<b-media>
   
    <img slot="aside" alt="Media Aside" />
    
    <h2>Media Body</h2>
    <p>Some text</p>
    
    <!-- [Optional: add media children here for nesting] -->
</b-media>
```

**Nesting**

You can easily nest media objects by including another media inside parent's body.

**Vertical Align**

Aside can be vertical aligned using `vertical-align` should be either `top`, `center` or `end` default is `top`.
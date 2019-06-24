# nuxtjs-boilerplate

## Local server development

Go to `package.json` and change `host` and `port` inside config > nuxt.

Enter `0.0.0.0` to use your local server IP.

## Inline SVG

[nuxt-svg](https://github.com/sam3d/nuxt-svg) module by [@sam3d](https://github.com/sam3d)

If you want to **use SVG** inside your components,
simply import it like a script and specify a RessourceQuery condition like:

```html
<img src="~/PathToLogo/logo.svg?data" alt="" />
```

--> **?data** for base64-inline

**or**

```javascript
import mySVG from '~/PathToLogo/logo.svg?inline';
```

--> **?inline** for svg tag

and use it as a normal components from Vue :

```vue
<template>
<mySVG>
</template>

<script>
import mySVG from "~/PathToLogo/logo.svg?inline";
  export default {
    components:{
    mySVG
    }
  }
</script>
```

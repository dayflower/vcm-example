<template lang="pug">
  #app
    #nav
      h1 Markdown editor

      b-alert(show v-if="isClean" variant="success")
        | Up to date
      b-alert(show v-else variant="warning")
        | Modified (Ctrl-S to save)

    codemirror#editor(ref="cmComponent" v-model="code" :options="cmOptions" @input="cmChanged")

    #preview
      div(v-html="rendered")
</template>

<script>
import 'codemirror/mode/markdown/markdown.js'
import 'codemirror/theme/mbo.css'
import marked from 'marked'

export default {
  name: 'App',

  data() {
    return {
      code: '',
      rendered: '',
      isClean: true,

      cmOptions: {
        theme: 'mbo',
        mode: 'text/x-markdown',
        lineNumbers: true,
        tabSize: 2,
        indentUnit: 2,
        smartIndent: true,
        indentWithTabs: false
      }
    }
  },

  mounted() {
    this.cmComponent.codemirror.save = (cm) => {
      this.isClean = cm.isClean()

      this.rendered = marked(this.code)
    }

    this.cmComponent.codemirror.setSize('100%', '100%')
  },

  computed: {
    cmComponent() {
      return this.$refs.cmComponent
    }
  },

  methods: {
    cmChanged() {
      this.isClean = this.cmComponent.codemirror.isClean()
    }
  }
}
</script>

<style>
html, body {
  height: 100vh;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  height: 100vh;
  display: grid;
  overflow: hidden;
  grid-template-rows: max-content 1fr;
  grid-template-columns: 50% 50%;
  grid-template-areas:
    "nav nav"
    "editor preview";
}

#nav {
  grid-area: nav;
}

#editor {
  grid-area: editor;
  overflow: hidden;
  border: solid 1px #ccc;
}

#preview {
  grid-area: preview;
  overflow: scroll;
  border: solid 1px #ccc;
}

#rendered {
  padding: 1rem;
}
</style>

<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card v-if="mode === 'add' || mode === 'edit'">
          <v-card-text key="chapter-form">
            <v-form>
              <v-text-field
                label="Chapter Name"
                prepend-icon="create"
                v-model="chapter.name"
              ></v-text-field>
              <v-select
                label="Chapter Type"
                prepend-icon="label"
                :items="chapterTypes"
                :value="chapterType"
                ref="chapterTypeSelect"
                @input="value => { chapterType = value }"
              >
              </v-select>
              <textarea 
                id="editor"
              ></textarea>
            </v-form>
          </v-card-text>
        </v-card>
        <v-card v-else-if="mode === 'view'">
          <v-card-title key="chapter-title"><h5 class="title" v-text="computedTitle"></h5></v-card-title>
          <v-card-text key="chapter-contents" v-html="renderedContent"></v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SimpleMDE from 'simplemde'
import marked from 'marked'
import 'simplemde-theme-dark/dist/simplemde-theme-dark.css'
export default {
  name: 'add-chapter',
  props: ['bookId', 'actionMode', 'chapterId'],
  data: function () {
    return {
      content: null,
      editor: null,
      name: '',
      chapterType: null,
      chapterTypes: [
        { text: 'Prologue', type: 'prologue' },
        { text: 'Normal Chapter', type: 'normal' },
        { text: 'Epilogue', type: 'epilogue' },
        { text: 'Afterword', type: 'afterword' }
      ],
      dataMode: null,
      currentMode: null,
      prevMode: null,
      computedTitle: null,
      renderedContent: null
    }
  },
  updated () {
    if (this.currentMode !== this.mode) {
      console.log(this.computedTitle)
      console.log(this.renderedContent)
      this.setup()
      this.setupEditor()
      this.prevMode = this.currentMode
      this.currentMode = this.mode
    }
  },
  created () {
    this.currentMode = this.mode
    this.setup()
  },
  mounted () {
    this.setupEditor()
  },
  methods: {
    setup () {
      if (this.mode === 'edit') {
        this.$store.commit('CHANGE_TITLE', 'Edit Chapter')
        console.log(this.chapterType)
        this.chapterType = this.getTypeObject(this.chapter.type)
        if (this.$refs.chapterTypeSelect) {
          console.log('Ref found')
          // this.$refs.chapterTypeSelect.$emit('input', this.chapter.type)
        }
        console.log(this.chapterType)
        this.$store.commit('REPLACE_ACTIONS', [{
          clickHandler: () => this.createChapter(),
          icon: 'done',
          props: {
            fab: true,
            color: 'pink',
            absolute: true,
            bottom: true,
            right: true,
            icon: true
          }
        }])
      } else if (this.mode === 'add') {
        this.$store.commit('CHANGE_TITLE', 'Add Chapter')
        this.$store.commit('REPLACE_ACTIONS', [{
          clickHandler: () => this.createChapter(),
          icon: 'done',
          props: {
            fab: true,
            color: 'pink',
            absolute: true,
            bottom: true,
            right: true,
            icon: true
          }
        }])
      } else if (this.mode === 'view') {
        this.$store.commit('CHANGE_TITLE', 'View Chapter')
        this.$store.commit('REPLACE_ACTIONS', [{
          clickHandler: () => {
            /* this.$router.push({
              name: 'chapter',
              params: {
                bookId: this.bookId,
                chapterId: this.chapterId,
                mode: 'edit'
              }
            }) */
            this.mode = 'edit'
          },
          icon: 'create',
          props: {
            fab: true,
            color: 'pink',
            absolute: true,
            bottom: true,
            right: true,
            icon: true
          }
        }])
        this.renderedContent = this.renderContent()
        this.computedTitle = this.computeTitle()
      }
    },
    renderContent () {
      return marked(this.chapter.content)
    },
    computeTitle () {
      var titleObj = this.getTypeObject(this.chapter.type)
      if (titleObj.type !== 'normal') {
        return titleObj.text + ': ' + this.chapter.name
      } else {
        return 'Chapter ' + (this.chapterId + 1) + ': ' + this.chapter.name
      }
    },
    setupEditor () {
      if (this.mode === 'edit' || this.mode === 'add') {
        this.editor = new SimpleMDE({
          element: document.getElementById('editor')
        })
      }
      if (this.mode === 'edit') {
        this.editor.value(this.chapter.content)
      }
    },
    createChapter () {
      this.chapter.content = this.editor.value()
      this.chapter.type = this.chapter.type.type || this.chapterType.type
      var stateChange = {
        bookId: this.bookId,
        chapter: this.chapter
      }
      if (this.mode === 'edit') {
        this.$store.commit('UPDATE_CHAPTER', stateChange)
      } else {
        this.$store.commit('ADD_CHAPTER', stateChange)
      }
      if (this.prevMode === 'view') {
        this.mode = 'view'
      } else {
        this.$router.go(-1)
      }
      // this.$router.push({name: 'book', params: {bookId: this.bookId}})
    },
    getTypeObject (chapterType) {
      if (typeof chapterType === 'object') {
        return chapterType
      } else {
        for (let index in this.chapterTypes) {
          let compChapterType = this.chapterTypes[index]
          if (compChapterType.type === chapterType) return compChapterType
        }
        throw new Error('Invalid chapter type: ' + chapterType)
      }
    }
  },
  watch: {
    chapter: function () {
      this.computedTitle = this.computeTitle()
      this.renderedContent = this.renderContent()
    }
  },
  computed: {
    chapter () {
      if (this.chapterId) {
        return this.$store.state.Books.books[this.bookId].chapters[this.chapterId]
      } else {
        return {
          name: '',
          type: '',
          content: ''
        }
      }
    },
    mode: {
      get: function () {
        if (this.dataMode) {
          return this.dataMode
        } else {
          this.dataMode = this.actionMode
          return this.dataMode
        }
      },
      set: function (newVal) {
        this.dataMode = newVal
      }
    }
  }
}
</script>

<style scoped>
.editor-toolbar a {
  color: white!important;
}
</style>

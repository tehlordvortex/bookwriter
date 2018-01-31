<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-card-text>
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
                :value.sync="chapter.type"
                @input="value => { chapter.type = value }"
              >
              </v-select>
              <textarea 
                id="editor"
              ></textarea>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SimpleMDE from 'simplemde'
import 'simplemde-theme-dark/dist/simplemde-theme-dark.css'
export default {
  name: 'add-chapter',
  props: ['bookId', 'mode', 'chapterId'],
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
      ]
    }
  },
  created () {
    if (this.mode === 'edit') {
      this.$store.commit('CHANGE_TITLE', 'Edit Chapter')
      this.chapter.type = this.getTypeObject(this.chapter.type)
      console.log(this.chapter)
    } else {
      this.$store.commit('CHANGE_TITLE', 'Add Chapter')
    }
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
  },
  mounted () {
    this.editor = new SimpleMDE({
      element: document.getElementById('editor')
    })
    if (this.mode === 'edit') {
      this.editor.value(this.chapter.content)
    }
  },
  methods: {
    createChapter () {
      this.chapter.content = this.editor.value()
      this.chapter.type = this.chapter.type.type
      var stateChange = {
        bookId: this.bookId,
        chapter: this.chapter
      }
      if (this.mode === 'edit') {
        this.$store.commit('UPDATE_CHAPTER', stateChange)
      } else {
        this.$store.commit('ADD_CHAPTER', stateChange)
      }
      this.$router.push({name: 'book', params: {bookId: this.bookId}})
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
  computed: {
    chapter () {
      if (this.chapterId) {
        return {...this.$store.state.Books.books[this.bookId].chapters[this.chapterId]}
      } else {
        return {
          name: '',
          type: '',
          content: ''
        }
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

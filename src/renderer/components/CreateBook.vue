<template>
  <v-container>
    <v-layout row wrap justify-center id="wrapper">
      <v-flex xs12 md10>
        <v-card>
          <v-toolbar>
            <v-toolbar-title>Create a book</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid" ref="form">
              <v-flex xs4>
                <v-card>
                  <v-card-media
                    :src="cover"
                    ref="cover"
                    height="300px"
                    @mouseenter="mouseEnterImageCard"
                    @mouseleave="mouseLeaveImageCard"
                    @click="chooseFile"
                  ></v-card-media>
                </v-card>
              </v-flex>
              <input type="file" class="hidden" id="sekritFileInput" accept="image/*" @change="handleImage($event.files)">
              <v-text-field
                label="Book title"
                prepend-icon="book"
                v-model="title"
                :rules="titleRules"
                required
              ></v-text-field>
              <v-text-field
                label="Book author"
                prepend-icon="perm_identity"
                v-model="author"
                :rules="authorRules"
                required
              ></v-text-field>
              <genre-input
                ref="genreInput"
                v-model="genres"
              ></genre-input>
              <v-btn
                @click="submit"
                :disabled="!valid"
                primary
              >
                start writing
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import GenreInput from '@/components/GenreInput.vue'
  import uuid from 'uuid/v4'

  export default {
    name: 'create-book',
    components: { GenreInput },
    data: () => ({
      title: '',
      author: '',
      genres: [],
      cover: '/static/no-image-found.gif',
      coverImage: '/static/no-image-found.gif',
      valid: null,
      titleRules: [(v) => !!v || 'Title is required'],
      authorRules: [(v) => !!v || 'Author is required']
    }),
    mounted () {
      document.getElementById('sekritFileInput').addEventListener('change', (e) => this.handleImage(e.target.files))
    },
    methods: {
      submit () {
        if (this.$refs.form.validate() && this.$refs.genreInput.validate(true)) {
          let book = {
            cover: this.coverImage,
            title: this.title,
            author: this.author,
            editors: [],
            otherAuthors: [],
            genres: this.genres,
            chapters: [],
            _id: uuid()
          }
          this.$store.commit('CREATE_BOOK', book)
          this.$router.push({name: 'book', params: {bookId: book._id}})
        }
      },
      chooseFile () {
        document.getElementById('sekritFileInput').click()
      },
      handleImage (files) {
        if (!files) return
        let reader = new FileReader()
        let file = files[0]
        reader.onload = (e) => {
          this.cover = e.target.result
          this.coverImage = e.target.result
        }
        reader.readAsDataURL(file)
      },
      mouseEnterImageCard () {
        this.cover = '/static/choose_image.png'
      },
      mouseLeaveImageCard () {
        this.cover = this.coverImage || '/static/no-image-found.gif'
      }
    }
  }
</script>

<style scoped>
  .hidden {
    display: none;
  }
</style>

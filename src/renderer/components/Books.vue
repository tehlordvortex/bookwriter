<template>
  <v-layout row wrap id="wrapper">
    <v-flex xs12>
      <v-container v-if="books && Object.keys(books).length > 0" fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex
            v-for="book in books"
            v-if="book"
            :key="book._id"
            xs12
            sm5
            md3
          >
            <v-card ripple :to="'/book/' + book._id">
              <v-card-media
                :src="book.cover || '/static/no-image-found.gif'"
                height="300px"
              >
                <v-container fill-height fluid>
                  <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                      <p class="title black--text above-all" v-text="book.title"></p>
                      <p class="subheading black--text above-all" v-text="book.author"></p>
                      <p class="caption black--text above-all" v-text="book.genres.join(', ')"></p>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-media>
              <v-card-actions>
                <v-btn
                  icon
                  flat
                  router
                  :to="'/book/' + book._id + '/edit'"
                >
                  <v-icon>create</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  icon
                  flat
                  @click="deleteBook(book._id)"
                >
                  <v-icon>delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-card v-else>
          <v-card-title>
            <span class="title">No books yet.</span>
          </v-card-title>
          <v-card-text>
            <p>You haven't written any books. Why don't you go ahead and show the world your literary genius?</p>
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="primary"
              router
              to="/create/book"
            >
              write a book
            </v-btn>
          </v-card-actions>
        </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'books',
    created () {
      this.$store.commit('CHANGE_TITLE', 'Books')
    },
    data: () => ({
    }),
    methods: {
      deleteBook (book) {
        this.$store.commit('DELETE_BOOK', book)
      },
      gotoBook (bookId) {
        this.$router.go({name: 'book', params: {bookId}})
      }
    },
    computed: {
      books () {
        return this.$store.state.Books.books
      }
    }
  }
</script>

<style scoped>
  .above-all {
    z-index: 10000;
  }
</style>

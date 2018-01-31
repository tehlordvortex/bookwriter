<template>
  <div>
    <template v-for="genre, index in genres">
      <v-btn
        flat 
        color="grey" 
        :key="genre"
        @click="removeGenre(index)"
      >
        {{ genre }}
        <v-icon right>close</v-icon>
      </v-btn>
    </template>
    <v-text-field
      v-model="currentGenre"
      prepend-icon="label"
      label="Genres"
      hint="Type a genre then hit enter."
      ref="inputField"
      @blur="validate"
      @keyup.enter="addGenre"
      required
      :rules="[(i) => i != '' || this.genres.length > 0 || 'You need to input at least one value']"
    ></v-text-field>
  </div>
</template>

<script>
  export default {
    name: 'genre-input',
    props: ['value', 'required'],
    data: () => ({
      genres: [],
      currentGenre: ''
    }),
    created () {
      this.genres = this.value
    },
    methods: {
      removeGenre (index) {
        this.genres = this.genres.slice(0, index).concat(this.genres.slice(index + 1))
        this.$emit('input', this.genres)
      },
      addGenre () {
        if (this.genres.indexOf(this.currentGenre) > -1) {
          return
        }
        this.currentGenre = this.currentGenre.trim()
        if (this.currentGenre === '') {
          return
        }
        this.genres.push(this.currentGenre)
        this.validate()
        this.currentGenre = ''
        this.$emit('input', this.genres)
      },
      validate (formSubmit) {
        if (!formSubmit && this.currentGenre !== '') {
          this.$refs.inputField.error = false
          return true
        }
        if (this.genres.length < 1) {
          this.$refs.inputField.error = true
          return false
        } else {
          this.$refs.inputField.error = false
          return true
        }
      }
    },
    computed: {
      validationRules () {
        console.log(this.genres)
        return [(i) => this.genres.length < 1 || 'You need to input at least one value']
      }
    }
  }
</script>

<style>

</style>

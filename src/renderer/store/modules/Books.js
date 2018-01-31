const state = {
  books: {}
}

const mutations = {
  CREATE_BOOK (state, book) {
    state.books[book._id] = book
  },
  DELETE_BOOK (state, book) {
    delete state.books[book]
  },
  UPDATE_BOOK (state, parameters) {
    for (var attribute in parameters.updatedAttributes) {
      console.log(attribute)
    }
  },
  ADD_CHAPTER (state, parameters) {
    if (!state.books[parameters.bookId]) {
      throw new Error('Non-existent bookId')
    } else {
      var index = state.books[parameters.bookId].chapters.push(parameters.chapter)
      state.books[parameters.bookId].chapters[index - 1]._id = index - 1
    }
  },
  UPDATE_CHAPTER (state, parameters) {
    if (!state.books[parameters.bookId]) {
      throw new Error('Non-existent bookId')
    } else {
      state.books[parameters.bookId].chapters[parameters.chapter._id] = parameters.chapter
    }
  },
  DELETE_CHAPTER (state, parameters) {
    console.log(parameters)
    delete state.books[parameters.bookId].chapters[parameters.chapterId]
  }
}

const actions = {
}

export default {
  state,
  mutations,
  actions
}

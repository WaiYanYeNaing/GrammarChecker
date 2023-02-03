<template>
  <div class="flex flex-col mx-56 space-y-5 my-10">
    <textarea
      v-model="text"
      id="text"
      rows="4"
      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Write your thoughts here..."
    ></textarea>
    <button
      @click="checkSpelling"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-44 mx-auto rounded-full"
    >
      Check Spelling
    </button>
    <div v-for="match in matches" :key="match.offset" class="my-3">
      <p class="text-red-500">{{ match.message }}</p>
      <p v-if="match.replacements.length">
        <span>You can use</span>
        <span
          class="text-green-500 mr-1"
          v-for="replacement in match.replacements"
          :key="replacement.offset"
          >{{ replacement.value }}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "CheckSpelling",
  data() {
    return {
      text: "this is an vook",
      matches: [],
    };
  },
  computed: {
    ...mapState(["history"]),
  },
  methods: {
    checkSpelling() {
      const encodedParams = new URLSearchParams();
      encodedParams.append("language", "en-US");
      encodedParams.append("text", this.text);

      const options = {
        method: "POST",
        url: "https://dnaber-languagetool.p.rapidapi.com/v2/check",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key":
            "e9c95e0419msh46961ef198fc0d4p129025jsnb2c7a8badea8",
          "X-RapidAPI-Host": "dnaber-languagetool.p.rapidapi.com",
        },
        data: encodedParams,
      };

      axios
        .request(options)
        .then((response) => {
          this.matches = response.data.matches;
          this.$store.commit("addToHistory", {
            text: this.text,
            matches: this.matches,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style>
@media (min-width: 640px) {
  textarea {
    width: 50%;
  }
}
</style>

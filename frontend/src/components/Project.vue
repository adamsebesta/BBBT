<template lang="html">
  <div class="project" v-if="project">
    <div class="project-details">
      <h1 class="project_name">{{ project.name }}</h1>
      <p class="project_budget">${{ project.budget }}</p>
      <div class="tasks">
        Tasks:
        <div
          v-for='task in project.tasks'
          v-bind:key='task._id'
        >
          {{task.description}}
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    id: String
  },
  components: {

  },
  data() {
    return {
      project: null,
      endpoint: 'http://localhost:8080/api/projects/',
      showModal: false,
      isClicked: false
    }
  },
  methods: {
    async fetchListing(id) {
      let res = await fetch(`${this.endpoint}${id}`);
      let data = await res.json()
      return this.setResults(data);
    },

    setResults(results) {
      this.project= results
    }
  },
  created() {
    this.fetchListing(this.id);
  },
  watch: {
    '$route'() {
      this.fetchListing(this.id);
    }
  }
}
</script>

<style lang="scss" scoped>

.project {
    position: relative;
    width: 90%;
    margin: 0 auto;
    padding: 50px 20px 70px;
    height: 80vh;
    margin-top: 3.5rem;
  }


  .project-details {
    display: flex;
    margin-top: 5rem;
    margin-left: 10px;
    width: 100%;
    flex-direction: column;
  }

  .project-product {
    flex: 0 1 70%;
  }

  .user-sidebar {
    flex: 0 1 30%;
  }

  .project .project_name {
    position: relative;
    text-transform: uppercase;
    z-index: 1;
    margin-top: 0;
  }
  .project .project_description {
    position: relative;
    z-index: 1;
    }
  .project .project_price {
      font-size: 16px;
      opacity: .9;
      margin-bottom: 5rem;
      line-height: 2;
      font-weight: 900;
      z-index: 0;
  }

</style>

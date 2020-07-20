<template lang="html">
  <div class="project" v-if="project">
    <div class="project-details">
      <h1 class="project_name"> <span>Name:</span> {{ project.name }}</h1>
      <p class="project_budget"> <span>Budget:</span>${{ project.budget }}</p>
      <div class="tasks">
        <h2>Tasks:</h2>
        <div
          v-for='(task, index) in project.tasks'
          v-bind:key='task._id'
        >
          <div class="task-number">
          {{index + 1}}.
          </div>
            <div class="task-details">
              <div class="">
                description: {{task.description}}
              </div>
              <h3>Assigned workers:</h3>
              <div
                v-for= '(worker, index) in task.assigned_workers'
                v-bind:key='worker._id'
              >
              {{index + 1}}.
            <p>{{worker.first_name + " " + worker.last_name}}</p>
              </div>
            --------------
            </div>
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

  .tasks {
    flex-direction: column;
    display: flex;

  }

  .task-details {
    flex-direction: column;
    display: flex;
    margin-top: 1rem;
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

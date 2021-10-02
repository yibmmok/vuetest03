<template>
  <div class="container">
    <Header @toggle-add-task="toggleAddTask" title="排程追蹤器" :showAddTask="showAddTask" />
    <div v-show="showAddTask">
      <AddTask @add-task="addTask"/>
    </div>
    <Tasks @toggle-reminder="toggleReminder" @delete-task="deleteTask" :tasks="tasks"/>
  </div>
</template>

<script>
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

export default {
  name: 'App',
  components: {
    Header,
    Tasks,
    AddTask
  },
  data() {
    return {
      tasks: [],
      showAddTask: false
    }
  },
  methods: {
    toggleAddTask() {
      this.showAddTask = !this.showAddTask
    },
    async addTask(task) {
      let url = 'http://localhost/api/test01/addTask.php';
      let options = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(task)
      }
      const res = await fetch(url, options)

      const data = await res.json()

      this.tasks = [...this.tasks, data]
    },
    deleteTask(id) {
      if (confirm('是否刪除?')) {
        this.tasks = this.tasks.filter((task) => task.id !== id)
      }
    },
    toggleReminder(id) {
      this.tasks = this.tasks.map(
        (task) => task.id === id ? {...task, reminder: !task.reminder} : task
      )
    },
    async fetchTasks() {
      // const res = await fetch('http://localhost:5001/tasks')
      const res = await fetch('http://localhost/api/test01/fetchTasks.php')
      // const res = await fetch('api/test01/fetchTasks.php')

      const data = await res.json()

      return data.tasks
    },
    async fetchTask(id) {
      // const res = await fetch('http://localhost:5001/tasks')
      let keydata = {'id': id}
      let options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(keydata)
      }
      const res = await fetch(`http://localhost/api/test01/fetchTasks.php`, options)
      // const res = await fetch(`api/test01/fetchTasks.php`, options)

      const data = await res.json()

      return data.tasks
    },    
  },
  async created() {
    this.tasks = await this.fetchTasks()
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: 'Poppins', sans-serif;
  }
  .container {
    max-width: 500px;
    margin: 30px auto;
    overflow: auto;
    min-height: 300px;
    border: 1px solid steelblue;
    padding: 30px;
    border-radius: 5px;
  }
  .btn {
    display: inline-block;
    background: #000;
    color: #fff;
    border: none;
    padding: 10px 20px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    font-size: 15px;
    font-family: inherit;
  }
  .btn:focus {
    outline: none;
  }
  .btn:active {
    transform: scale(0.98);
  }
  .btn-block {
    display: block;
    width: 100%;
  }
</style>

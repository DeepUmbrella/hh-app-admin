<template>
  <div class="app-container">
    <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mac_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createDate }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button v-if="!row.enable" size="mini" type="success" @click="handleModifyStatus(row, row.enable)">
            启用
          </el-button>
          <el-button v-if="row.enable" size="mini" @click="handleModifyStatus(row, row.enable)">
            停用
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.page_size"
      @pagination="get_machine_list" />


  </div>
</template>

<script>
import { removeRegisterMachine, updateMachineStatus, fetchMachineList } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination



export default {
  name: 'MachineApply',
  components: { Pagination },
  directives: { waves },

  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        page_size: 20,
      },

      importanceOptions: [1, 2, 3],
      downloadLoading: false
    }
  },
  created() {
    this.get_machine_list()
  },
  methods: {
    get_machine_list({ page, limit: page_size } = { page: 1, limit: 20 }) {
      this.listLoading = true
      fetchMachineList(page, page_size).then(response => {
        this.list = response.result
        this.total = response.total
      }).finally(() => {
        this.listLoading = false
      })
    },

    async handleModifyStatus(row, apply_reason) {
      updateMachineStatus(row.mac_id, apply_reason).then(response => {
        this.$notify({
          title: 'Success',
          message: 'update Successfully',
          type: 'success',
          duration: 2000
        })
        this.get_machine_list()
      })

    },

    async handleDelete(row) {

      removeRegisterMachine(row.mac_id).then(response => {
        this.$notify({
          title: 'Success',
          message: 'Delete Successfully',
          type: 'success',
          duration: 2000
        })
        this.get_machine_list()
      })



    }



  }
}
</script>

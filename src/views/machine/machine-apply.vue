<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList()">
        刷新申请列表
      </el-button>
    </div>


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
      <el-table-column label="申请时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleApply(row, 'apply')">
            通过
          </el-button>
          <el-button size="mini" type="danger" @click="handleApply(row)">
            拒绝
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
      @pagination="getList" />


  </div>
</template>

<script>
import { applyMachine, fetchList } from '@/api/article'
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
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList().then(response => {
        this.list = response.result
        this.total = response.total
      }).finally(() => {
        this.listLoading = false
      })
    },

    async handleApply(row, apply_reason) {
      applyMachine(row.mac_id, apply_reason).then(response => {
        this.list = response.result
        this.total = response.total
        this.$notify({
          title: 'Success',
          message: apply_reason ? 'Apply Successfully' : "Delete Successfully",
          type: 'success',
          duration: 2000
        })
      })
    },



  }
}
</script>

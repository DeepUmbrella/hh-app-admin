<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="account_name" placeholder="搜索账号..." style="width: 200px;" class="filter-item" />
    </div>
    <el-table :key="tableKey" v-loading="listLoading" :data="filter_list" border fit highlight-current-row
      style="width: 100%;">
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" align="center">
        <template slot-scope="{row}">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="密码" align="center">
        <template slot-scope="{row}">
          <span>{{ row.password }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mac_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="{row}">
          <span :style="{ color: row.enable ? 'green' : 'red' }">{{ row.enable ? "正常" : "停用" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createDate }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="edit_hh_user(row)">
            编辑
          </el-button>
          <el-button v-if="!row.enable" size="mini" type="success" @click="handleModifyStatus(row)">
            启用
          </el-button>
          <el-button v-if="row.enable" size="mini" @click="handleModifyStatus(row)">
            停用
          </el-button>
          <el-button size="mini" type="danger" @click="handle_delete_user(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.page_size"
      @pagination="get_hh_user_list" />

    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px"
        style="width: 400px; margin-left:50px;">

        <el-form-item label="密码">
          <el-input v-model="temp.password" type="password" placeholder="密码" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="handle_change_user()">
          提交
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { get_hh_user_list, delete_hh_app_user, update_hh_app_user_status, update_hh_app_user_info } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { getToken } from '@/utils/auth'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination



export default {
  name: 'HHAccountList',
  components: { Pagination },
  directives: { waves },

  data() {
    return {
      dialogFormVisible: false,
      account_name: "",
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        page_size: 20,
      },
      downloadLoading: false,
      temp: {
        password: "",
      },
      rules: {
        password: [{ required: true, message: 'password is required', trigger: 'change' }],
      },
    }
  },
  created() {
    this.get_hh_user_list()
  },

  computed: {

    filter_list() {
      if (!this.account_name) {
        return this.list
      }
      return this.list?.filter(item => {
        return item.username.includes(this.account_name)
      }) ?? []
    }
  },


  methods: {
    get_hh_user_list() {
      this.listLoading = true
      const token = getToken()
      get_hh_user_list(token).then(response => {
        this.list = response.result
        this.total = response.total
      }).finally(() => {
        this.listLoading = false
      })
    },

    edit_hh_user(row) {
      this.dialogFormVisible = true
      this.temp = { ...row }
    },



    async handleModifyStatus(row) {


      update_hh_app_user_status(row).then(res => {
        this.$notify({
          title: 'Success',
          message: 'update Successfully',
          type: 'success',
          duration: 2000
        })

        this.get_hh_user_list()

      })
    },




    async handle_change_user() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          update_hh_app_user_info(this.temp).then(response => {
            this.$notify({
              title: 'Success',
              message: 'update info Successfully',
              type: 'success',
              duration: 2000
            })
            this.get_hh_user_list()
          }).finally(() => {
            this.dialogFormVisible = false
          })
        }
      })



    },

    async handle_delete_user(row) {
      delete_hh_app_user(row).then(res => {
        this.$notify({
          title: 'Success',
          message: 'Delete Successfully',
          type: 'success',
          duration: 2000
        })
        this.get_hh_user_list()
      })
    }



  }
}
</script>

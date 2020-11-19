<template>
  <div class="app-container">
    <!-- <div style="margin: 30px 0;">
      <el-row :gutter="20" class="app-container-row">
        <el-col :span="3">
          <el-input v-model="search.mobile" style="width:100%" placeholder="输入手机号码" />
        </el-col>
        <el-col :span="3">
          <el-input v-model="search.userName" style="width:100%" placeholder="输入下单人名称" />
        </el-col>
        <el-col :span="3">
          <el-input v-model="search.payCode" style="width:100%" placeholder="输入支付码" />
        </el-col>
        <el-col :span="3">
          <el-select v-model="search.orderStatus" placeholder="选择订单状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
         <el-col :span="6">
          <el-date-picker
            v-model="search.dataTime"
            @change="handleChangeData"
            style="width:100%;"
            type="datetimerange"
            range-separator="-"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="开始时间"
            end-placeholder="截止时间"
            :default-time="['00:00:00', '23:59:59']"
            :clearable='false'
          ></el-date-picker>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="handleSearch" >查询</el-button>
          <el-button type="primary" @click="handleClear">清空</el-button>
        </el-col>
      </el-row>
    </div> -->
    <h1 class="page--heading">Filecoin Space Race2</h1>
    <h2 class="page--subheading">Deals for miner t022072</h2>
    <div style="margin-top: 50px">
      <el-table :data="dataList" border stripe>
        <el-table-column
          prop="filecoinCid"
          :show-overflow-tooltip="true"
          label="Data CID"
        >
          <template slot-scope="scope">
            <a
              class="table-a"
              :href="'http://183.240.204.123:8080/ipfs/'+scope.row.ipfsCid"
              download
              target='_blank'
              >{{ scope.row.filecoinCid || '下载'}}</a
            >
          </template>
        </el-table-column>
        <!-- <el-table-column prop="ipfsCid" :show-overflow-tooltip="true" label="Deal CID" /> -->
        <el-table-column
          prop="fileSize"
          :show-overflow-tooltip="true"
          label="File size"
        >
          <template slot-scope="scope">
            {{ scope.row.fileSize | sizeConversion }}
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          :show-overflow-tooltip="true"
          label="Created"
        >
        <template slot-scope="scope">
            <span class="status">{{ hangdeChangeTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>

        <!-- <el-table-column prop="statusName" :show-overflow-tooltip="true" label="订单状态">
          <template slot-scope="scope">
            <span class="status">{{ scope.row.statusName }}</span>
          </template>
        </el-table-column> -->
      </el-table>
      <el-pagination
        style="margin-top: 30px"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { CIDList } from "@/utils/api";
// import{ formatDate } from '@/utils/valid'
export default {
  data() {
    return {
      dataList: [],
      search: {
        mobile: "",
        orderStatus: "",
        payCode: "",
        userName: "",
        endTime: "",
        startTime: "",
        dataTime: [],
      },
      size: 10, // 页面数据
      total: 1, // 总条数
      currentPage: 1, // 当前页面
      permissions: {}, // 控制页面显示
      loadingPDFInstance: null,
    };
  },
    filters: {
    sizeConversion(value) {
      if (!value) {
        return "0B"
      } else {
        let falg = 1;
        if (value > 0) {
          falg = 1;
        } else {
          falg = -1;
        }
        var num = falg * value;
        if (num < 1024) {
          return falg * num + "B";
        } else if (num < 1048576) {
          return ((falg * num) / 1024).toFixed(2) + "KB"
        } else if (num < 1073741824) {
          return ((falg * num) / 1024 / 1024).toFixed(2) + "M"
        } else if (num < 1099511627776) {
          return ((falg * num) / 1024 / 1024 / 1024).toFixed(2) + "G"
        } else if (num < 1125899906842624) {
          return ((falg * num) / 1024 / 1024 / 1024 / 1024).toFixed(2) + "T"
        } else {
          return (
            ((falg * num) / 1024 / 1024 / 1024 / 1024 / 1024).toFixed(2) + "P"
          );
        }
      }
    },
  },
  created() {
    this.handleGetData();
  },
  methods: {
    // 获取表格数据  getid?start=10&pagesize=2

    async handleGetData(dataList) {
      let { data,totalcount } = await CIDList({
        start:
          dataList && dataList.current ? dataList.current : this.currentPage,
        pagesize: dataList && dataList.size ? dataList.size : this.size,
      });
      // console.log(list)
      this.dataList = data;
      this.total = totalcount;
      //  this.currentPage = d
    },
   hangdeChangeTime(time) {
    //  let time2 = await formatDate(time)
     return time
   },
    // handleSubmit(data) {
    //   api(data.url, 'post', { orderCode: data.orderCode }, true)
    //     .then(res => {
    //       this.dialogData.show = false
    //       if (res.code === 200) {
    //         this.$message({
    //           type: 'success',
    //           message: data.message
    //         })
    //         this.handleGetData()
    //       } else {
    //         this.$message.error(res.message)
    //       }
    //     })
    //     .catch(error => {
    //       this.dialogData.show = false
    //       console.log(error)
    //     })
    // },
    // 改变清空
    gangjiChange() {
      for (const item in this.search) {
        this.search[item] = "";
      }
    },
    /**
     * 页面条数
     * @param val
     */
    handleSizeChange(val) {
      this.handleGetData({ size: val });
    },
    /**
     * 切换页面
     * @param val
     */
    handleCurrentChange(val) {
      this.handleGetData({ current: val });
    },
    /**
     * 搜索
     */
    handleSearch() {
      this.currentPage = 1;
      this.handleGetData(this.search);
    },
    /**
     * 清空搜索
     */
    handleClear() {
      for (const item in this.search) {
        this.search[item] = "";
      }
      this.handleGetData();
    },
  },
};
</script>

<style scoped>
.app-container {
  padding: 8px 30px;
  border: 1px solid #fff;
}
.page--heading {
  font-size: 24px;
  line-height: 26px;
  font-weight: 500;
}
.page--subheading {
  font-size: 36px;
  line-height: 40px;
  font-weight: 600;
}
.table-a {
  color: #409eff;
  text-decoration: none;
}
</style>


<template>
  <ul class="type_selection">
    <li v-for="item in DATA" :key="item" @click="handleClick(item)" :class="item === active ? 'active' : ''">
      {{ calculateResourceType(item) }}
    </li>
  </ul>
</template>

<script>
export default {
	data() {
		return {
			DATA: [],
			active: -1,
		};
	},
	props: {
		dataSource: {
			type: Array,
			required: true,
		},
	},
  methods: {
    handleClick(item){
      if (item === this.active) {
        this.active = -1
      } else {
        this.active = item
      }
      this.$emit('select',this.active)
    }
  },
	created() {
		this.DATA = this.dataSource;
		console.log("类型列表", this.DATA);
	},
	computed: {
		calculateResourceType() {
			return (type) => {
				switch (type) {
					case 0:
						return "影视";
					case 1:
						return "便捷办公";
					case 2:
						return "开发工具";
					case 3:
						return "娱乐";
					case 4:
						return "音乐";
					case 5:
						return "Adobe全家桶";
					case 6:
						return "学习考试";
					default:
						break;
				}
			};
		},
	},
};
</script>

<style lang="less" scoped>
ul.type_selection {
  display: flex;
  flex-wrap: wrap;

  li {
    padding: 8px;
    border: 1px solid #d81e06;
    border-radius: 6px;
    margin: 12px 8px 0 6px;
    cursor: url("../assets/cursor/person.png"), pointer;
    font-weight: 600;
  }

  li.active {
    background: #d81e06;
    color: #fff;
  }
}
</style>
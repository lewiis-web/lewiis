<template>
	<ul class="type_selection">
		<li
			v-for="item in DATA"
			:key="item.id"
			@click="handleClick(item)"
			:class="item.id == active ? 'active' : ''"
		>
			{{ item.name }}
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
		handleClick(item) {
			if (item.id == this.active) {
				this.active = -1;
			} else {
				this.active = item.id;
			}
			this.$emit("select", this.active);
		},
	},
	created() {
		this.DATA = this.dataSource;
	},
	computed: {},
};
</script>

<style lang="less" scoped>
ul.type_selection {
	display: flex;
	flex-wrap: wrap;

	li {
		height: 34px;
		padding: 8px;
		border: 1px solid #d81e06;
		border-radius: 6px;
		margin: 12px 8px 6px 8px;
		cursor: url("../assets/cursor/person.png"), pointer;
		font-size: 16px;
		font-weight: 600;
	}

	li.active {
		background: #d81e06;
		color: #fff;
	}
}
</style>
<template>
	<div>
        <div class="panel panel-default">
            <div class="panel-heading">Users list</div>
            <div class="panel-body">
            	<div class="col-md-12">
            		<div class="form-group">
	                    <a href="javascript:;" v-on:click="back()" class="btn btn-default">Back</a>
	                    <div class="pull-right">
	                        <form v-on:submit.prevent="fetchData()">
	                            <input width="220px" type="text" v-model="keywords" class="form-control text-left" placeholder="Search">
	                        </form>
	                    </div>
	                </div>

	                <table class="table table-bordered table-striped table-list-data">
	                    <thead>
		                    <tr>
		                        <th class="table-head">#</th>
		                        <th v-for="column in columns" :key="column" @click="sortByColumn(column)"
			                        class="table-head">
			                        {{ column | columnHead }}
			                        <span v-if="column === sortedColumn">
			                            <i v-if="order === 'asc' " class="fas fa-arrow-up"></i>
			                            <i v-else class="fas fa-arrow-down"></i>
			                        </span>
			                    </th>
			                    <th class="text-center" width="12%">Action</th>
			                </tr>
			            </thead>
			            <tbody>
			                <tr class="" v-if="tableData.length === 0">
			                    <td class="lead text-center" :colspan="columns.length + 1">No data found.</td>
			                </tr>
			                <tr v-for="(data, key1) in tableData" :key="data.id" class="m-datatable__row" v-else>
			                    <td>{{ serialNumber(key1) }}</td>
			                    <td v-for="(value, key) in data">{{ value }}</td>
			                    <td class="text-center">
	                                <user-edit-modal :show="showModal(data.id)" @close="toggleModal(data.id)"></user-edit-modal>
					            	<a class="text-sm" href="#" @click.stop="toggleModal(data.id)">Show</a>

	                                <a href="javascript:;" class="btn btn-sm btn-danger" v-on:click="deleteUser(data.id, index)">
	                                    <i class="fa fa-trash-alt"></i> Delete
	                                </a>
	                            </td>
			                </tr>
			            </tbody>
	                </table>
            	</div>
                <!-- Pagination -->
                <div v-if="pagination && tableData.length > 0">
                	<div class="col-offset-md-6 col-md-6">
                		<div>
                			<span><i>Displaying {{ pagination.data.length }} of {{ pagination.meta.total }} entries.</i></span>
                		</div>

				        <ul class="pagination">
				            <li class="page-item" :class="{'disabled' : currentPage === 1}">
				                <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Previous</a>
				            </li>
				            <li v-for="page in pagesNumber" class="page-item"
					            :class="{'active': page == pagination.meta.current_page}">
					            <a href="javascript:void(0)" @click.prevent="changePage(page)" class="page-link">{{ page }}</a>
					        </li>
					        <li class="page-item" :class="{'disabled': currentPage === pagination.meta.last_page }">
					            <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Next</a>
					        </li>
					    </ul>
                	</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import UserEditModal from '../../components/users/UserEditModal.vue';

    export default {
    	components: { UserEditModal },
		props: {
			fetchUrl: { type: String, required: true },
			columns: { type: Array, required: true },
		},
		data() {
			return {
				activeModal: 0,
				tableData: [],
				url: '',
				pagination: {
					meta: { to: 1, from: 1 }
				},
				offset: 4,
				currentPage: 1,
				perPage: 5,
				sortedColumn: this.columns[0],
				order: 'asc',
				keywords: '',
				endpoint: '/api/v1/users/list'
			}
		},
		watch: {
			fetchUrl: {
				handler: function(fetchUrl) {
					this.url = fetchUrl
				},
				immediate: true
			},
			keywords(after, before) {
                this.fetchData();
            }
		},
		created() {
			return this.fetchData()
		},
     	computed: {
	        /**
	         * Get the pages number array for displaying in the pagination.
	         * */
	        pagesNumber() {
	        	if (!this.pagination.meta.to) {
			        return []
			    }
			    let from = this.pagination.meta.current_page - this.offset
			    if (from < 1) {
			    	from = 1
				}
				let to = from + (this.offset * 2)
				if (to >= this.pagination.meta.last_page) {
					to = this.pagination.meta.last_page
				}
				let pagesArray = []
				for (let page = from; page <= to; page++) {
					pagesArray.push(page)
				}
				return pagesArray
	        },
	        /**
	         * Get the total data displayed in the current page.
	         * */
	        totalData() {
	          return (this.pagination.meta.to - this.pagination.meta.from) + 1
	        }
      	},
      	methods: {
	        fetchData() {
	          	let dataFetchUrl = `${this.endpoint}?page=${this.currentPage}&column=${this.sortedColumn}&order=${this.order}&per_page=${this.perPage}`
	          	axios.get(dataFetchUrl, {params:{keywords: this.keywords}}).then(({ data }) => {
	              this.pagination = data
	              this.tableData = data.data
	            }).catch(error => this.tableData = [])
	        },
	        /**
	         * Get the serial number.
	         * @param key
	         * */
	        serialNumber(key) {
	          	return (this.currentPage - 1) * this.perPage + 1 + key
	        },
	        /**
	         * Change the page.
	         * @param pageNumber
	         */
	        changePage(pageNumber) {
	          	this.currentPage = pageNumber
	          	this.fetchData()
	        },
	        /**
	         * Sort the data by column.
	         * */
	        sortByColumn(column) {
	          	if (column === this.sortedColumn) {
	            	this.order = (this.order === 'asc') ? 'desc' : 'asc'
	          	} else {
	            	this.sortedColumn = column
		            this.order = 'asc'
	          	}
	          this.fetchData()
	        },
	        createUser() {
            	window.location.href = "/users/create";
            },
            back() {
            	window.location.href = "/";
            },
            editUserModal(id) {
            	window.location.href = "/users/edit-modal/" + id;
            },
            showModal: function(id) {
                return this.activeModal === id 
            },
            toggleModal: function (id) {
                if(this.activeModal !== 0) {
                    this.activeModal = 0
                    return false
                }
                this.activeModal = id
            }
      	},
      	filters: {
	        columnHead(value) {
	        	var str = value.split('_').join(' ');
	          	return str.charAt(0).toUpperCase() + str.slice(1) 
	        }
      	}
    }
</script>

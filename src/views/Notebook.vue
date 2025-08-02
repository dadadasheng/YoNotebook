<script setup lang="ts">
import { onMounted, ref } from 'vue';
import  { axios } from '@/api/index';
const axiosInstance = axios;
const currentDate = new Date();
const isCalenderDays = ref(true);
const isCalenderMonths = ref(false);
const isTodo = ref(false);
const isDone = ref(false);
const isDel = ref(false);

const showCalenderDays = () => {
    isCalenderDays.value = true;
    isCalenderMonths.value = false;
    isTodo.value = false;
};
const showCalenderMonths = () => {
    isCalenderDays.value = false;
    isCalenderMonths.value = true;
    isTodo.value = false;
};
const showTodo = () => {
    isTodo.value = true;
    isCalenderDays.value = false;
    isCalenderMonths.value = false;
    isDone.value = false;
    isDel.value = false;
};
const showDone = () => {
    isDone.value = !isDone.value;
};
const showDel = () => {
    isDel.value = !isDel.value;
};

const todoItems = ref([
    { text: 'Todo Item 1', done: false },
    { text: 'Todo Item 2', done: false },
    { text: 'Todo Item 3', done: false }
]);
const doneItems = ref([
    { text: 'Done Item 1', done: true },
    { text: 'Done Item 2', done: true }
]);
const delItems = ref([
    { text: 'Deleted Item 1', done: false },
    { text: 'Deleted Item 2', done: false }
]);
const todoText = ref('');
const addTodoItem = () => {
    if (todoText.value.trim()) {
        todoItems.value.push({ text: todoText.value, done: false });
        axiosInstance.post('/todoItem/add',null,{
            params:{
                todo_text: todoText.value,
                status: 0,
            }
        })
        todoText.value = '';
    }
};
const delTodoItem = (index: number) => {
    delItems.value.push({ text: todoItems.value[index].text, done: false });
    todoItems.value.splice(index, 1);
};
const doneTodoItem = (index: number) => {
    doneItems.value.push({ text: todoItems.value[index].text, done: true });
    todoItems.value.splice(index, 1);
};
const delDoneItem = (index: number) => {
    todoItems.value.push({ text: doneItems.value[index].text, done: false });
    doneItems.value.splice(index, 1);
};
const delDelItem = (index: number) => {
    todoItems.value.push({ text: delItems.value[index].text, done: false });
    delItems.value.splice(index, 1);
};
const selectedYear = ref(2025);
const selectedMonth = ref(1);
const selectedDay = ref(1);
const day_list = ref([])
const str_week = (year: number, month: number, day: number) =>{
    if(month < 3) {
        month += 12;
        year -= 1;
    }
    let week_index = Math.round((day+2*month+3*(month+1)/5+year+year/4-year/100+year/400))%7;
    return week_index;
};
const getDaylist = (year: number, month: number) => {
    let days = new Date(year, month, 0).getDate();
    let firstDayWeekIndex =str_week(year, month, 1);
    day_list.value = [];
    for (let i = 0; i < firstDayWeekIndex; i++) {
        day_list.value.push('');
    }
    for (let i = 1; i <= days; i++) {
        day_list.value.push(i);
    }
    for (let i = 0; i < 43 - days - firstDayWeekIndex-1; i++) {
        day_list.value.push('');
    }
};
const showSelectedDayTodo = (day_num: number)=>{
    if(day_num.toString() === '') return;
    selectedDay.value = day_num
        axiosInstance.get('/todoItem/create_time',{
        params: {
            year: selectedYear.value.toString(),
            month: selectedMonth.value.toString().padStart(2, '0'), 
            day: selectedDay.value.toString()
        }
    })
    .then(response => {
        allItems.value = response.data;
        console.log(response.data);
        // getSelectedDayTodoData()
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}
const selectedDayTodoData = ref({
    todoItems: [],
    doneItems: [],
    delItems: []
});
const allItems = ref([]);
// const getSelectedDayTodoData = () => {
//     const targetDate = `${selectedYear.value}-${selectedMonth.value.toString().padStart(2, '0')}-${selectedDay.value.toString().padStart(2, '0')}`;
//     console.log(allItems.value.filter(item => item.create_time.startsWith(targetDate)));}
onMounted(() => {
    const currentDate = new Date();
    selectedYear.value = currentDate.getFullYear();
    selectedMonth.value = currentDate.getMonth() + 1; // Months are 0-indexed in JavaScript
    selectedDay.value = currentDate.getDate();
    getDaylist(selectedYear.value, selectedMonth.value);
    axiosInstance.get('/todoItem/all')
    .then(response => {
        allItems.value = response.data;
        console.log(response.data);
        // getSelectedDayTodoData()
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});

// time text status
</script>
<template>
    <div class="container">
        <div class="nav_container">
            <div class="nav">
                <h1>Yo Notebook</h1>
            </div>
        </div>
        <div class="main_container">
            <div class="main">
                <div class="data_content_container">
                    <div class="year">
                        <p>{{selectedYear}}</p>
                    </div>
                    <div class="month" @click="showCalenderMonths">
                        <p>{{ selectedMonth }}</p>
                    </div>
                    <div class="day" @click="showCalenderDays">
                        <p>{{ selectedDay  }}</p>
                    </div>
                    <div class="blank"></div>
                    <div class="todo_data_container">
                        <div class="total_num" @click="showTodo">
                            <p>{{ todoItems.length }}</p>
                        </div>
                        <div class="detail_num_container">
                            <div @click="showDone" class="done_num">
                                <div>{{ doneItems.length }}</div>
                                <div>√</div>
                            </div>
                            <div class="none"></div>
                            <div @click="showDel" class="del_num">
                                <div>{{ delItems.length }}</div>
                                <div>x</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="isCalenderDays" class="calender_days_content_container">
                    <div class="week_list_container">
                        <div class="week_item">Mon</div>
                        <div class="none"></div>
                        <div class="week_item">Tue</div>
                        <div class="none"></div>
                        <div class="week_item">Wed</div>
                        <div class="none"></div>
                        <div class="week_item">Thu</div>
                        <div class="none"></div>
                        <div class="week_item">Fri</div>
                        <div class="none"></div>
                        <div class="week_item">Sat</div>
                        <div class="none"></div>
                        <div class="week_item">Sun</div>
                    </div>
                    <div class="calender_day_container">
                        <div class="day_list_row_container">
                            <div class="day_item" @click="showSelectedDayTodo(day_list[0])" :class="{none_date_item: day_list[0] === '' }">
                                {{ day_list[0] }}
                            </div>
                            <div class="none"></div>
                            <div class="day_item" :class="{none_date_item: day_list[1] === '' }" @click="showSelectedDayTodo(day_list[1])">
                                {{ day_list[1] }}
                            </div>
                            <div class="none"></div>
                            <div class="day_item" :class="{none_date_item: day_list[2] === '' }"  @click="showSelectedDayTodo(day_list[2])">
                                {{ day_list[2] }}
                            </div>
                            <div class="none"></div>
                            <div class="day_item" :class="{none_date_item: day_list[3] === '' }" @click="showSelectedDayTodo(day_list[3])">
                                {{ day_list[3] }}
                            </div>
                            <div class="none"></div>
                            <div class="day_item" :class="{none_date_item: day_list[4] === '' }" @click="showSelectedDayTodo(day_list[4])">
                                {{ day_list[4] }}
                            </div>
                            <div class="none"></div>
                            <div class="day_item" :class="{none_date_item: day_list[5] === '' }" @click="showSelectedDayTodo(day_list[5])">
                                {{ day_list[5] }}
                            </div>
                            <div class="none"></div>
                            <div class="day_item" :class="{none_date_item: day_list[6] === '' }" @click="showSelectedDayTodo(day_list[6])"> 
                                {{ day_list[6] }}
                            </div>
                        </div>
                        <div class="day_list_row_container">
                            <div class="day_item" :class="{none_date_item: day_list[7] === '' }" @click="showSelectedDayTodo(day_list[7])">
                                {{ day_list[7] }}
                            </div>
                            <div class="none"></div>
                            <div class="day_item" :class="{none_date_item: day_list[8] === '' }"  @click="showSelectedDayTodo(day_list[8])">
                                {{ day_list[8] }}
                            </div>
                            <div class="none"></div>
                            <div class="day_item" :class="{none_date_item: day_list[9] === '' }" @click="showSelectedDayTodo(day_list[9])">
                                {{ day_list[9] }}
                            </div>
                            <div class="none"></div>
                            <div class="day_item" :class="{none_date_item: day_list[10] === '' }" @click="showSelectedDayTodo(day_list[10])">
                                {{ day_list[10] }}
                            </div>
                            <div class="none"></div>
                            <div class="day_item" :class="{none_date_item: day_list[11] === '' }" @click="showSelectedDayTodo(day_list[11])">
                                {{ day_list[11] }}
                            </div>
                            <div class="none"></div>
                            <div class="day_item" :class="{none_date_item: day_list[12] === '' }" @click="showSelectedDayTodo(day_list[12])">
                                {{ day_list[12] }}
                            </div>
                            <div class="none"></div>
                            <div class="day_item" :class="{none_date_item: day_list[13] === '' }" @click="showSelectedDayTodo(day_list[13])">
                                {{ day_list[13] }}
                            </div>
                        </div>
                        <div class="day_list_row_container">
                            <div class="day_item" :class="{none_date_item: day_list[14] === '' }" @click="showSelectedDayTodo(day_list[14])">
                                {{ day_list[14] }}
                            </div>
                            <div class="none"></div>
                            <div class="day_item" :class="{none_date_item: day_list[15] === '' }" @click="showSelectedDayTodo(day_list[15])">
                                {{ day_list[15] }}
                            </div>
                            <div class="none"></div>
                            <div class="day_item" :class="{none_date_item: day_list[16] === '' }" @click="showSelectedDayTodo(day_list[16])">
                                {{ day_list[16] }}
                            </div>
                            <div class="none"></div>
                            <div class="day_item" :class="{none_date_item: day_list[17] === '' }" @click="showSelectedDayTodo(day_list[17])">
                                {{ day_list[17] }}
                            </div>
                            <div class="none"></div>
                            <div class="day_item" :class="{none_date_item: day_list[18] === '' }" @click="showSelectedDayTodo(day_list[18])">
                                {{ day_list[18] }}
                            </div>
                            <div class="none"></div>
                            <div class="day_item" :class="{none_date_item: day_list[19] === '' }" @click="showSelectedDayTodo(day_list[19])">
                                {{ day_list[19] }}
                            </div>
                            <div class="none"></div>
                            <div class="day_item" :class="{none_date_item: day_list[20] === '' }" @click="showSelectedDayTodo(day_list[20])">
                                {{ day_list[20] }}
                            </div>
                        </div>
                        <div class="day_list_row_container">
                            <div class="day_item" :class="{none_date_item: day_list[21] === '' }" @click="showSelectedDayTodo(day_list[21])">
                                {{ day_list[21] }}
                            </div>
                            <div class="none"></div>
                            <div class="day_item" :class="{none_date_item: day_list[22] === '' }" @click="showSelectedDayTodo(day_list[22])">
                                {{ day_list[22] }}
                            </div>
                            <div class="none"></div>
                            <div class="day_item" :class="{none_date_item: day_list[23] === '' }" @click="showSelectedDayTodo(day_list[23])">
                                {{ day_list[23] }}
                            </div>
                            <div class="none"></div>
                            <div class="day_item" :class="{none_date_item: day_list[24] === '' }" @click="showSelectedDayTodo(day_list[24])">
                                {{  day_list[24] }}
                            </div>
                            <div class="none"></div>
                            <div class="day_item" :class="{none_date_item: day_list[25] === '' }" @click="showSelectedDayTodo(day_list[25])">
                                {{ day_list[25] }}
                            </div>
                            <div class="none"></div>
                            <div class="day_item" :class="{none_date_item: day_list[26] === '' }" @click="showSelectedDayTodo(day_list[26])">
                                {{ day_list[26] }}
                            </div>
                            <div class="none"></div>
                            <div class="day_item" :class="{none_date_item: day_list[27] === '' }" @click="showSelectedDayTodo(day_list[27])">
                                {{ day_list[27] }}
                            </div>
                        </div>
                        <div class="day_list_row_container">
                            <div class="day_item" :class="{none_date_item: day_list[28] === '' }" @click="showSelectedDayTodo(day_list[28])">
                                {{ day_list[28] }}
                            </div>
                            <div class="none"></div>
                            <div class="day_item" :class="{none_date_item: day_list[29] === '' }" @click="showSelectedDayTodo(day_list[29])">
                                {{  day_list[29] }}
                            </div>
                            <div class="none"></div>
                            <div class="day_item" :class="{none_date_item: day_list[30] === '' }" @click="showSelectedDayTodo(day_list[30])">
                                {{ day_list[30] }}
                            </div>
                            <div class="none"></div>
                            <div class="day_item" :class="{none_date_item: day_list[31] === '' }" @click="showSelectedDayTodo(day_list[31])">
                                {{ day_list[31] }}
                            </div>
                            <div class="none"></div>
                            <div class="day_item" :class="{none_date_item: day_list[32] === '' }" @click="showSelectedDayTodo(day_list[32])">
                                {{ day_list[32] }}
                            </div>
                            <div class="none"></div>
                            <div class="day_item" :class="{none_date_item: day_list[33] === '' }" @click="showSelectedDayTodo(day_list[33])">
                                {{ day_list[33] }}
                            </div>
                            <div class="none"></div>
                            <div class="day_item" :class="{none_date_item: day_list[34] === '' }" @click="showSelectedDayTodo(day_list[34])">
                                {{ day_list[34] }}
                            </div>
                        </div>
                        <div class="day_list_row_container">
                            <div class="day_item" :class="{none_date_item: day_list[35] === '' }" @click="showSelectedDayTodo(day_list[35])"> 
                                {{ day_list[35] }}
                            </div>
                            <div class="none"></div>
                            <div class="day_item" :class="{none_date_item: day_list[36] === '' }" @click="showSelectedDayTodo(day_list[36])">
                                {{ day_list[36] }}
                                {{  day_list[36] }}
                            </div>
                            <div class="none"></div>
                            <div class="day_item" :class="{none_date_item: day_list[37] === '' }" @click="showSelectedDayTodo(day_list[37])">
                                {{ day_list[37] }}
                            </div>
                            <div class="none"></div>
                            <div class="day_item" :class="{none_date_item: day_list[38] === '' }"  @click="showSelectedDayTodo(day_list[38])">
                                {{ day_list[38] }}
                            </div>
                            <div class="none"></div>
                            <div class="day_item" :class="{none_date_item: day_list[39] === '' }"  @click="showSelectedDayTodo(day_list[39])">
                                {{ day_list[39] }}
                            </div>
                            <div class="none"></div>
                            <div class="day_item" :class="{none_date_item: day_list[40] === '' }"  @click="showSelectedDayTodo(day_list[40])">
                                {{ day_list[40] }}
                            </div>
                            <div class="none"></div>
                            <div class="day_item" :class="{none_date_item: day_list[41] === '' }" @click="showSelectedDayTodo(day_list[41])">
                                {{ day_list[41] }}
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="isCalenderMonths" class="calender_months_content_container">
                    <div class="calender_month_container">
                        <div class="month_list_row_container">
                            <div class="month_item" @click="selectedMonth = 1;getDaylist(selectedYear, selectedMonth);showCalenderDays();">1</div>
                            <div class="none"></div>
                            <div class="month_item" @click="selectedMonth = 2;getDaylist(selectedYear, selectedMonth);showCalenderDays();">2</div>
                            <div class="none"></div>
                            <div class="month_item" @click="selectedMonth = 3;getDaylist(selectedYear, selectedMonth);showCalenderDays();">3</div>
                            <div class="none"></div>
                            <div class="month_item" @click="selectedMonth = 4;getDaylist(selectedYear, selectedMonth);showCalenderDays();">4</div>
                        </div>
                        <div class="month_list_row_container">
                            <div class="month_item" @click="selectedMonth = 5;getDaylist(selectedYear, selectedMonth);showCalenderDays();">5</div>
                            <div class="none"></div>
                            <div class="month_item" @click="selectedMonth = 6;getDaylist(selectedYear, selectedMonth);showCalenderDays();">6</div>
                            <div class="none"></div>
                            <div class="month_item" @click="selectedMonth = 7;getDaylist(selectedYear, selectedMonth);showCalenderDays();">7</div>
                            <div class="none"></div>
                            <div class="month_item" @click="selectedMonth = 8;getDaylist(selectedYear, selectedMonth);showCalenderDays();">8</div>
                        </div>
                        <div class="month_list_row_container">
                            <div class="month_item" @click="selectedMonth = 9;getDaylist(selectedYear, selectedMonth);showCalenderDays();">9</div>
                            <div class="none"></div>
                            <div class="month_item" @click="selectedMonth = 10;getDaylist(selectedYear, selectedMonth);showCalenderDays();">10</div>
                            <div class="none"></div>
                            <div class="month_item" @click="selectedMonth = 11;getDaylist(selectedYear, selectedMonth);showCalenderDays();">11</div>
                            <div class="none"></div>
                            <div class="month_item" @click="selectedMonth = 12;getDaylist(selectedYear, selectedMonth);showCalenderDays();">12</div>
                        </div>
                    </div>
                </div>
                <div v-if="isTodo" class="todo_container">
                    <div v-if="isTodo" v-show="todoItems.length !== 0" class="doing_items_container">
                        <div v-for="(item, index) in todoItems" class="todo_item_container">
                            <p>{{ item.text }}</p>
                            <div class="none"></div>
                            <button @click="delTodoItem(index)">Delete</button>
                            <button @click="doneTodoItem(index)">Done</button>
                        </div>
                    </div>
                    <div v-if="isDone && todoItems.length !== 0" class="none"></div>
                    <div v-if="isDone && doneItems.length !== 0" class="done_items_container">
                        <div v-for="item,index in doneItems" class="todo_item_container done_item">
                            <p>{{ item.text }}</p>
                            <div class="none"></div>
                            <button @click="delDoneItem(index)">revoke</button>
                        </div>
                    </div>
                    <div v-if="isDel && doneItems.length !== 0" class="none"></div>
                    <div v-if="isDel && delItems.length !== 0" class="del_items_container">
                        <div v-for="item,index in delItems" class="todo_item_container del_item">
                            <p>{{ item.text }}</p>
                            <div class="none"></div>
                            <button @click="delDelItem(index)">revoke</button>
                        </div>
                    </div>
                </div>
                <div v-if="isTodo" class="add_todo_items_container">
                    <div class="add_item_input_container">
                        <input type="text" placeholder="Add a new todo item" v-model="todoText" />
                    </div>
                    <div class="add_item_button" @click="addTodoItem">
                        <p>Add</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>  
<style scoped>
.container {
    height: 100%;
    width: 100%;
    background-color: black;
    display: flex;
    flex-direction: column;
    .nav_container{
        height: 100px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        .nav{
            height: 80%;
            width: 80%;
            border: solid 1px white;
            border-radius: 10px;
            text-align: center;
        }
    }
    .main_container{
        flex: 1;
        .main{
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .data_content_container{
                height: 110px;
                width: 80%;
                display: flex;
                flex-direction: row;
                .year{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100px;
                    width: 160px;
                    font-size: 48px;
                    color: white;
                    border: solid 1px white;
                    border-radius: 10px;
                    margin-right: 10px;
                }
                .month, .day{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100px;
                    width: 100px;
                    font-size: 48px;
                    color: white;
                    border: solid 1px white;
                    border-radius: 10px;
                    margin-right: 10px;
                }
                .blank{
                    flex: 1;
                }
                .todo_data_container{
                    height: 100px;
                    width: 150px;
                    font-size: 64px;
                    color: white;
                    display: flex;
                    flex-direction: row;
                    .total_num{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100%;
                        width: 100px;
                        font-size: 64px;
                        border: solid 1px white;
                        border-radius: 10px;
                        margin-right: 10px;
                    }
                    .detail_num_container{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        height: 100%;
                        min-width: 50px;
                        width: fit-content;
                        font-size: 64px;
                        color: white;
                        .none{
                            height: 10px;
                        }
                        .del_num, .done_num{
                            font-size: 24px;
                            line-height: 24px;
                            width: 50px;
                            flex: 1;
                            border: solid 1px white;
                            border-radius: 10px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            flex-direction: row;
                        }
                    }
                }
            }
            .calender_days_content_container{
                display: flex;
                flex-direction: column;
                flex: 1;
                width: 80%;
                .week_list_container{
                    display: flex;
                    flex-direction: row;
                    height: 50px;
                    margin-bottom: 10px;
                    .none{
                        width: 10px;
                    }
                    .week_item{
                        flex: 1;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: white;
                        font-size: 24px;
                        border: solid 1px white;
                        border-radius: 10px;
                    }
                }
                .calender_day_container{
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    .day_list_row_container{
                        flex: 1;
                        display: flex;
                        flex-direction: row;
                        margin-bottom: 10px;
                        color: white;
                        .none{
                            width: 10px;
                        }
                        .day_item{
                            flex: 1;
                            border: solid 1px white;
                            border-radius: 10px;
                        }
                        .none_date_item{
                            border: solid 1px transparent;
                        }
                    }
                }
            }
            .calender_months_content_container{
                display: flex;
                flex-direction: column;
                flex: 1;
                width: 80%;
                .calender_month_container{
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    .month_list_row_container{
                            flex: 1;
                            display: flex;
                            flex-direction: row;
                            margin-bottom: 10px;
                            color: white;
                            .none{
                                width: 10px;
                            }
                            .month_item{
                                flex: 1;
                                border: solid 1px white;
                                border-radius: 10px;
                            }
                    }
                }
            }
            .todo_container{
                width: 80%;
                flex: 1;
                display: flex;
                flex-direction: row;
                button{
                    background-color: transparent;
                    border: none;
                    color: white;
                }
                .none{
                    width: 10px;
                }
                .doing_items_container{
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    color: white;
                    .todo_item_container{
                        padding: 0 20px;
                        height: 50px;
                        margin-bottom: 10px;
                        border: solid 1px white;
                        border-radius: 5px;
                        display: flex;
                        flex-direction: row;
                        .none{
                            flex: 1;
                        }
                    }
                    
                }   
                .del_items_container{
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    color: white;
                    .todo_item_container{
                        padding: 0 20px;
                        height: 50px;
                        margin-bottom: 10px;
                        border: solid 1px rgb(153, 23, 23);
                        border-radius: 5px;
                        display: flex;
                        flex-direction: row;
                        .none{
                            flex: 1;
                        }
                    }
                }
                .done_items_container{
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    color: white;
                    .todo_item_container{
                        padding: 0 20px;
                        height: 50px;
                        margin-bottom: 10px;
                        border: solid 1px rgb(7, 134, 73);
                        border-radius: 5px;
                        display: flex;
                        flex-direction: row;
                        .none{
                            flex: 1;
                        }
                    }
                }
            }
            .add_todo_items_container{
                width: 80%;
                height: 50px;
               
                margin-bottom: 50px;
                display: flex;
                flex-direction: row;
                .add_item_input_container{
                     flex: 1;
                     border: solid 1px white;
                     border-radius: 5px;
                     margin-right: 10px;
                     display: flex;
                     input{
                        flex: 1;
                        padding: 10px;
                        border: none;
                        background-color: transparent;
                        color: white;
                        font-size: 16px;
                        border: none;
                    }
                    input:focus{
                        outline: none;
                    }
                }
                .add_item_button{
                    width: 100px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: solid 1px white;
                    color: white;
                    font-size: 24px;
                    border-radius: 5px;
                    cursor: pointer;
                }
                
            }
        }

    }
}
</style>
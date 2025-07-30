<script lang="ts">
</script>
<template>
    <div class="container">
        <div class="nav_container">
            <div class="nav">

            </div>
        </div>
        <div class="main_container">
            <div class="main">
                <div class="data_content_container">
                    <div class="year">
                        <p>2025</p>
                    </div>
                    <div class="month">
                        <p>7</p>
                    </div>
                    <div class="day">
                        <p>8</p>
                    </div>
                    <div class="blank"></div>
                    <div class="todo_data_container">
                        <div class="total_num">
                            <p>8</p>
                        </div>
                        <div class="detail_num_container">
                            <div class="del_num"></div>
                            <div class="none"></div>
                            <div class="done_num"></div>
                        </div>
                    </div>
                </div>
                <div v-if="false" class="calender_days_content_container">
                    <div class="week_list_container">
                        <div class="week_item">Sun</div>
                        <div class="none"></div>
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
                    </div>
                    <div class="calender_day_container">
                        <div class="day_list_row_container">
                            <div class="day_item"></div>
                            <div class="none"></div>
                            <div class="day_item"></div>
                            <div class="none"></div>
                            <div class="day_item"></div>
                            <div class="none"></div>
                            <div class="day_item"></div>
                            <div class="none"></div>
                            <div class="day_item"></div>
                            <div class="none"></div>
                            <div class="day_item"></div>
                            <div class="none"></div>
                            <div class="day_item"></div>
                        </div>
                        <div class="day_list_row_container">
                            <div class="day_item"></div>
                            <div class="none"></div>
                            <div class="day_item"></div>
                            <div class="none"></div>
                            <div class="day_item"></div>
                            <div class="none"></div>
                            <div class="day_item"></div>
                            <div class="none"></div>
                            <div class="day_item"></div>
                            <div class="none"></div>
                            <div class="day_item"></div>
                            <div class="none"></div>
                            <div class="day_item"></div>
                        </div>
                        <div class="day_list_row_container">
                            <div class="day_item"></div>
                            <div class="none"></div>
                            <div class="day_item"></div>
                            <div class="none"></div>
                            <div class="day_item"></div>
                            <div class="none"></div>
                            <div class="day_item"></div>
                            <div class="none"></div>
                            <div class="day_item"></div>
                            <div class="none"></div>
                            <div class="day_item"></div>
                            <div class="none"></div>
                            <div class="day_item"></div>
                        </div>
                        <div class="day_list_row_container">
                            <div class="day_item"></div>
                            <div class="none"></div>
                            <div class="day_item"></div>
                            <div class="none"></div>
                            <div class="day_item"></div>
                            <div class="none"></div>
                            <div class="day_item"></div>
                            <div class="none"></div>
                            <div class="day_item"></div>
                            <div class="none"></div>
                            <div class="day_item"></div>
                            <div class="none"></div>
                            <div class="day_item"></div>
                        </div>
                        <div class="day_list_row_container">
                            <div class="day_item"></div>
                            <div class="none"></div>
                            <div class="day_item"></div>
                            <div class="none"></div>
                            <div class="day_item"></div>
                            <div class="none"></div>
                            <div class="day_item"></div>
                            <div class="none"></div>
                            <div class="day_item"></div>
                            <div class="none"></div>
                            <div class="day_item"></div>
                            <div class="none"></div>
                            <div class="day_item"></div>
                        </div>
                    </div>
                </div>
                <div v-if="true" class="calender_months_content_container">
                    <div class="calender_month_container">
                        <div class="month_list_row_container">
                            <div class="month_item"></div>
                            <div class="none"></div>
                            <div class="month_item"></div>
                            <div class="none"></div>
                            <div class="month_item"></div>
                            <div class="none"></div>
                            <div class="month_item"></div>
                        </div>
                        <div class="month_list_row_container">
                            <div class="month_item"></div>
                            <div class="none"></div>
                            <div class="month_item"></div>
                            <div class="none"></div>
                            <div class="month_item"></div>
                            <div class="none"></div>
                            <div class="month_item"></div>
                        </div>
                        <div class="month_list_row_container">
                            <div class="month_item"></div>
                            <div class="none"></div>
                            <div class="month_item"></div>
                            <div class="none"></div>
                            <div class="month_item"></div>
                            <div class="none"></div>
                            <div class="month_item"></div>
                        </div>
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
                    width: 300px;
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
                        width: 200px;
                        font-size: 64px;
                        color: white;
                        .none{
                            height: 10px;
                        }
                        .del_num, .done_num{
                            width: 200px;
                            flex: 1;
                            background-color: #5d4040;
                            border: solid 1px white;
                            border-radius: 10px;
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
                        .none{
                            width: 10px;
                        }
                        .day_item{
                            flex: 1;
                            border: solid 1px white;
                            border-radius: 10px;
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
        }

    }
}
</style>
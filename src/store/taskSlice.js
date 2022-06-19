import { createSlice } from "@reduxjs/toolkit";



const taskSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: [],
    },

    reducers: {
        addTask(state, action) {
            let details = action.payload;
            return {
                tasks: [...state.tasks, details],
            };
        },
        removeTask(state, action) {
            let id = action.payload;
            return {
                tasks: state.tasks.filter((item) => item.id !== id)
            };
        },
        toogleStatus(state, action) {
            const { todoId, completed, disabled } = action.payload;
            return {
                tasks: state.tasks.map((item) => {
                    if (item.id === todoId) {
                        return {
                            ...item,
                            completed: !completed,
                            disabled: !disabled

                        };
                    }
                    return item;
                }),
            };
        },
        taskCompleted(state, action) {
            return {
                tasks: state.tasks.filter((item) => item.completed !== true)
            };
        },



    },
});

export const taskActions = taskSlice.actions;
export default taskSlice;
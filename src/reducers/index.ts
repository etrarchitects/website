
import { TypedUseSelectorHook, useSelector } from "react-redux"
import { combineReducers, createStore } from "redux"
import { devToolsEnhancer } from "redux-devtools-extension"
import { Category } from "../api"

export interface WrappedCategory {
   category: Category,
   limit: number,
   active: boolean,
}

export type CategoryState = WrappedCategory[]

export const ADD_CATEGORY = "ADD_CATEGORY"
interface AddCategoryAction {
   type: typeof ADD_CATEGORY,
   payload: {category:Category, active:boolean}[]
}
export const SWITCH_CATEGORY = "SWITCH_CATEGORY"
interface SwitchCategoryAction {
   type: typeof SWITCH_CATEGORY,
   payload: Category
}
export const RESET_CATEGORY = "RESET_CATEGORY"
interface ResetCategoryAction {
   type: typeof RESET_CATEGORY
}

export const INCREMENT_CATEGORY = "INCREMENT_CATEGORY"
interface IncrementCategoryAction {
   type: typeof INCREMENT_CATEGORY
}
export type CategoryActionType = AddCategoryAction | SwitchCategoryAction | ResetCategoryAction | IncrementCategoryAction

export const defaultLimit = 3;

function categoryReducer(
   state: CategoryState = [],
   action: CategoryActionType
): CategoryState {
   switch(action.type){
      case ADD_CATEGORY:
         return action.payload.map(({category,active}) => ({
            category,
            active,
            limit: defaultLimit
         }));
      case SWITCH_CATEGORY:
         return state.map(({category, limit}) => ({
            category,
            active: category.id === action.payload.id,
            limit: category.id === action.payload.id ? limit : defaultLimit
         }))
      case RESET_CATEGORY:
         return state.map(({category, limit}) => ({
            category,
            active: false,
            limit
         }))
      case INCREMENT_CATEGORY:
         return state.map(({category, limit,active}) => ({
            category,
            active,
            limit: active ? limit + defaultLimit : limit
         }))
      default:
         return state;
   }
}

export const TOGGLE_OPENED = "TOGGLE_OPENED"
interface ToggleOpenedAction {
   type: typeof TOGGLE_OPENED
}
export const CLOSE_OPENED = "CLOSE_OPENED"
interface CloseOpenedAction {
   type: typeof CLOSE_OPENED
}
export type OpenedActionType = ToggleOpenedAction | CloseOpenedAction


function openedReducer(state: boolean = false, action: OpenedActionType){
   switch(action.type){
      case TOGGLE_OPENED:
         return !state;
      case CLOSE_OPENED:
         return false;
      default:
         return state;
   }
}

const rootReducer = combineReducers({
   category: categoryReducer,
   opened: openedReducer
})

export const store = createStore(rootReducer, devToolsEnhancer({}));

export const useTypedSelector: TypedUseSelectorHook<ReturnType<typeof rootReducer>> = useSelector;
export type AppDispatch = typeof store.dispatch

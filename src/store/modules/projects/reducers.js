
import {
    AN_ERROR_OCCURED_DURING_SELECTION, PROJECT_PROGRESS_SUCCESSFULLY_UPDATED,
    PROJECTS_SUCCESSFULLY_REGISTERED,
    REGISTERED_PROJECTS_FETCHED_SUCCESSFULLY,
    REGISTERING_PROJECTS_FAILED, RESET_WRONG_PROJECT_CREDENTIALS, SET_PROJECT, STORE_PROJECT, WRONG_SELECTION
} from "./actionTypes";
import {PRIVILEGES_SUCCESSFULLY_UPDATED} from "../privileges/actionTypes";
import {RESET_WRONG_CREDENTIALS} from "../../user_management/user_log_in/actionTypes";

export const ACTION_HANDLERS = {

    [PROJECTS_SUCCESSFULLY_REGISTERED]: state =>
        Object.assign({}, state, {
            projectsSuccessFullyRegistered: true
        }),
    [REGISTERING_PROJECTS_FAILED]: state =>
        Object.assign({}, state, {
            projectsSuccessFullyRegistered: false
        }),
    [REGISTERED_PROJECTS_FETCHED_SUCCESSFULLY]: (state, action) =>
        Object.assign({}, state, {
            registeredProjects: action.payload.registeredProjects
        }),

    [STORE_PROJECT]: (state, action) =>
        Object.assign({}, state, {
            isSelectionSuccessful: true,
            project_session_details: action.payload.project_session_details,
            isProjectSessionActive: true
        }),

    [WRONG_SELECTION]: state =>
        Object.assign({}, state, {
            hasWrongProjectCredentials: true
        }),
    [AN_ERROR_OCCURED_DURING_SELECTION]: state =>
        Object.assign({}, state, {
            accessToProjectDenied: true
        }),

    [SET_PROJECT]: (state, action) =>
        Object.assign({}, state, {
            projectSelect: action.payload.projectSelect
        }),
    [PROJECT_PROGRESS_SUCCESSFULLY_UPDATED]: state =>
        Object.assign({}, state, {
            projectProgressSuccessFullyUpdated: true
        }),

    [RESET_WRONG_PROJECT_CREDENTIALS]: state =>
        Object.assign({}, state, {
            hasWrongProjectCredentials: false
        }),


};

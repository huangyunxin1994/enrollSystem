import {getResultful,get,post} from '@/api/https.js'
let base = '';
export const requestLogin = params => { return post(`${base}/login`, params, {emulateJSON: true}); };

export const createEnrollment = params => { return post(`${base}/signup/createEnrollment`, params, {emulateJSON: true}); };
export const selectSigup = params => { return get(`${base}/signup/selectSigup`, params); };
export const getSignup = params => { return getResultful(`${base}/applicants/Signup`, params); };
export const getSignupPerson = params => { return getResultful(`${base}/applicants/signup`, params); };
export const getPersonDetial = params => { return getResultful(`${base}/applicants`, params); };
export const relationAdmin = params => { return post(`${base}/organization/relationAdmin`, params, {emulateJSON: true}); };
export const findPresent = params => { return post(`${base}/organization/findPresent`, params, {emulateJSON: true}); };
export const selectPresent = params => { return get(`${base}/organization/selectPresent`, params); };
export const selectPosition = params => { return get(`${base}/organization/selectPosition`, params); };


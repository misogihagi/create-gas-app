import { doGet, doPost } from "./main";

declare let global: any;
global.doGet = doGet;
global.doPost = doPost;

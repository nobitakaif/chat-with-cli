import { cancel,confirm, intro, isCancel, outro } from "@clack/prompts";
import {logger} from "better-auth"
import { createAuthClient } from "better-auth/client";
import { deviceAuthorizationClient } from "better-auth/client/plugins";
import chalk from "chalk";
import { Command } from "commander";
import fs from "node:fs/promises"
import open from "open";
import os from "os"
import path from "path";
import yoctoSpinner from "yocto-spinner";



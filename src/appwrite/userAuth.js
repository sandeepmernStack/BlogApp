import { Client, Account } from "appwrite";
import conf from "../conf/conf";

class userAuth {
    constructor() {
        this.client = new Client();
        this.client
            .setEndpoint(conf.appUrl) // Correct conf usage
            .setProject(conf.appProjectId);

        this.account = new Account(this.client);
    }

    // User Signup
    async signup(email, password, name) {
        try {
            const user = await this.account.create("unique()", email, password, name);
            console.log("User Signed Up:", user);
            return user;
        } catch (error) {
            console.error("Signup Error:", error);
            throw new Error(error.message);
        }
    }

    // User Login
    async login(email, password) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            console.log("User Logged In:", session);
            return session;
        } catch (error) {
            console.error("Login Error:", error);
            throw new Error(error.message);
        }
    }

    // User Logout
    async logout() {
        try {
            await this.account.deleteSession("current");
            console.log("User Logged Out");
        } catch (error) {
            console.error("Logout Error:", error);
            throw new Error(error.message);
        }
    }

    // Get Current User
    async getCurrentUser() {
        try {
            const user = await this.account.get();
            console.log("Current User:", user);
            return user;
        } catch (error) {
            console.error("Error Getting Current User:", error);
            throw new Error(error.message);
        }
    }
}

export default userAuth;

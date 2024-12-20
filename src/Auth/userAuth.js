import { Client, Account } from "appwrite"
import conf from "../conf/conf"
import { use } from "react";
class userAuth {
  
   constructor() {
     this.client = new Client()
     this.client 
     .setEndpoint(conf.appUrl && conf.appUrl)
     .setProject(conf.appProjectId && config.appProjectId(conf.appProjectId && conf.appProjectId));

     this.account = new Account(this.client)
     
    }

    //  user signup auth

    async signup(email, password, name){
        try {
            const user = await this.account.create("unique()", email,password,name)
            console.log(user)
            return user
            
        } catch (error) {
            console.log("SignUp Error", error)
            throw new Error(error);
            
        }
    }


    // user login auth

    async login(email, password){
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            console.log("User LoggedIn",session);
            return session

        } catch (error) {
            console.log("Login Error", error)
            throw new Error(error);
        }
    }

    // user logout auth

    async logout(){
        try {
            await this.account.deleteSession("current");
            console.log("User Logged out")
        } catch (error) {
            console.log("Logout Error", error)
            throw new Error(error);
        }
    }

// get current user
    async getCurrentUser (){
        try {
            const user = await this.account.get();
            console.log(user)
            return user

        } catch (error) {
            console.log("Getting current User", error)
            throw new Error(error);
        }
    }
}


export default userAuth
import { Client, ID, Account, Databases, Storage } from "appwrite";
import conf from "../conf/conf";

class Services {
    constructor() {
        this.client = new Client()
            .setEndpoint(conf.appUrl)
            .setProject(conf.appProjectId)

        this.account = new Account(this.client);
        this.database = new Databases(this.client);
        this.storage = new Storage(this.client);

        this.collectionId = conf.appCollectionId;

        if (!this.collectionId) {
            throw new Error("Collection ID is missing. Please check the configuration.");
        }
    }

    /**
     * Create a blog.
     */
    async createBlog({ title, content, featureimage, status, userId, slug }) {
        try {
            const data = { title, content, featureimage, status, userId, slug };
            const response = await this.database.createDocument(
                this.collectionId,
                slug,
                data
            );
            return response;
        } catch (error) {
            console.error("Error creating blog:", error.message);
            throw new Error("Failed to create a new blog.");
        }
    }

    /**
     * Update a blog.
     */
    async updateBlog(slug, updates) {
        try {
            const response = await this.database.updateDocument(
                this.collectionId,
                slug,
                updates
            );
            return response;
        } catch (error) {
            console.error("Error updating blog:", error.message);
            throw new Error("Failed to update the blog.");
        }
    }

    /**
     * Delete a blog.
     */
    async deleteBlog(slug) {
        try {
            await this.database.deleteDocument(this.collectionId, slug);
            return { success: true, message: "Blog deleted successfully." };
        } catch (error) {
            console.error("Error deleting blog:", error.message);
            throw new Error("Failed to delete the blog.");
        }
    }

    /**
     * Fetch a single blog by slug.
     */
    async getBlog(slug) {
        try {
            const response = await this.database.getDocument(this.collectionId, slug);
            return response;
        } catch (error) {
            console.error("Error fetching blog:", error.message);
            throw new Error("Failed to fetch the blog.");
        }
    }

    /**
     * Fetch all blogs, optionally filtered by status or userId.
     */
    async getBlogs(filters = {}) {
        try {
            const queries = [];
            if (filters.userId) queries.push(`userId=${filters.userId}`);
            if (filters.status) queries.push(`status=${filters.status}`);

            const response = await this.database.listDocuments(this.collectionId, queries);
            return response.documents;
        } catch (error) {
            console.error("Error fetching blogs:", error.message);
            throw new Error("Failed to fetch blogs.");
        }
    }

    /**
     * Upload a file.
     */
    async uploadFile(file) {
        try {
            const uniqueId = ID.unique(); // Generate a unique ID
            const response = await this.storage.createFile(uniqueId, file);
            console.log("File uploaded successfully:", response);
            return response;
        } catch (error) {
            console.error("Error uploading file:", error.message);
            throw new Error("Failed to upload the file.");
        }
    }

    /**
     * Delete a file by fileId.
     */
    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(fileId);
            return { success: true, message: "File deleted successfully." };
        } catch (error) {
            console.error("Error deleting file:", error.message);
            throw new Error("Failed to delete the file.");
        }
    }
}

export default new Services();

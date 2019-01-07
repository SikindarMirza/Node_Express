console.log("Hello");
getUser(1, getRepo);

function displayCommits(commits) {
    console.log(commits);
}
function getCommits(repos) {
    getCommits(repo, displayCommits);
}
function getRepo(user){
    getRepository(user.gitHubUserName, getCommits);
}
console.log("World");

function getUser(id, callback) {
    setTimeout(() => {
        console.log("Reading a user from the database");
        callback({id: id, gitHubUserName: "SikindarMirza"});
        
    },2000);
};

function getRepository(username, callback){
    setTimeout(() => {
        console.log("Calling the github API...");
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}
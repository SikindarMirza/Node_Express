// console.log("Hello");
// getUser(1, getRepo);

// function displayCommits(commits) {
//     console.log(commits);
// }
// function getCommits(repos) {
//     // getCommits(repos, displayCommits);
// }
// function getRepo(user){
//     getRepository(user.gitHubUserName, getCommits);
// }
// console.log("World");

// function getUser(id, callback) {
//     setTimeout(() => {
//         console.log("Reading a user from the database");
//         callback({id: id, gitHubUserName: "SikindarMirza"});
//     },2000);
// };

// function getRepository(username, callback){
//     setTimeout(() => {
//         console.log("Calling the github API...");
//         callback(['repo1', 'repo2', 'repo3']);
//     }, 2000);
// }

console.log("Hello");

getUser(1, repositories);

console.log("World");

function commits(commits) {
    console.log(`Commits are ${commits}`)
}

function pullrequests(pullRequests) {
    console.log(`All pullRequests are ${pullRequests}`);
    getCommits(pullRequests[0], commits)
}

function repos(repos) {
    getPullRequests(repos, pullrequests);
}

function repositories(user) {
    getRepositories(user.gitHubUserName, repos);
}

function getUser(id, callback) {
    setTimeout(() => {
        console.log("Reading data from the database...");
        callback({ id:id, gitHubUserName:'SikindarMirza' });
    },2000);
}

function getRepositories(user, callback) {
    setTimeout(()=>{
        console.log("Getting the repos of", user);
        callback(["repo1", "repo2", "repo3"]);
    },3000);
}

function getPullRequests(repos, callback) {
    setTimeout(() => {
        callback(['pullRequest1', 'pullRequest2', 'pullRequest3']);
    },2000);
    console.log(`The pullRequests of ${repos[0]} are`);
}

function getCommits(pullrequest, callback) {
    setTimeout(() => {
        callback(['Commit1','Commit2','Commit3']);
    },2000);
}
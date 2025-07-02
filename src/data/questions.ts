import { Question } from "../model/Question";

export const questions: Question[] = [
  {
        "question": "What is the git command that downloads your repository from GitHub to your computer?",
        "options": ["git push", "git commit", "git fork", "git clone"],
        "correctAnswer": "git clone"
    },
    {
        "question": "Which git command stages all changes in your working directory for the next commit?",
        "options": ["git add .", "git push", "git commit", "git init"],
        "correctAnswer": "git add ."
    },
    {
        "question": "What git command is used to upload local repository content to a remote repository?",
        "options": ["git clone", "git pull", "git push", "git status"],
        "correctAnswer": "git push"
    },
    {
        "question": "Which command is used to create a new branch in git?",
        "options": ["git commit", "git checkout", "git branch", "git clone"],
        "correctAnswer": "git branch"
    },
    {
        "question": "What git command shows the current state of the working directory and staging area?",
        "options": ["git diff", "git status", "git log", "git show"],
        "correctAnswer": "git status"
    },
    {
        "question": "Which command initializes a new git repository?",
        "options": ["git init", "git start", "git create", "git repo"],
        "correctAnswer": "git init"
    },
    {
        "question": "What git command is used to combine multiple commits into one?",
        "options": ["git rebase", "git squash", "git commit", "git merge"],
        "correctAnswer": "git squash"
    },
    {
        "question": "Which command downloads changes from a remote repository without merging?",
        "options": ["git fetch", "git pull", "git clone", "git push"],
        "correctAnswer": "git fetch"
    },
    {
        "question": "Which git command merges branches together?",
        "options": ["git merge", "git pull", "git rebase", "git clone"],
        "correctAnswer": "git merge"
    },
    {
        "question": "What is the command to see the commit history?",
        "options": ["git log", "git history", "git show", "git commit --history"],
        "correctAnswer": "git log"
    },
    {
        "question": "What is the git command to discard local changes in your working directory?",
        "options": ["git revert", "git reset", "git clean", "git restore"],
        "correctAnswer": "git restore"
    },
    {
        "question": "Which git command is used to unstage a file?",
        "options": ["git reset HEAD <file>", "git unstage <file>", "git remove <file>", "git checkout <file>"],
        "correctAnswer": "git reset HEAD <file>"
    },
    {
        "question": "What git command is used to move or rename a file?",
        "options": ["git mv", "git rename", "git move", "git file"],
        "correctAnswer": "git mv"
    },
    {
        "question": "Which command is used to delete a branch in git?",
        "options": ["git branch -d <branch_name>", "git delete <branch_name>", "git remove branch <branch_name>", "git branch --delete <branch_name>"],
        "correctAnswer": "git branch -d <branch_name>"
    },
    {
        "question": "What git command temporarily shelves changes you've made to your working copy?",
        "options": ["git stash", "git save", "git hold", "git shelf"],
        "correctAnswer": "git stash"
    },
    {
        "question": "Which command applies the most recently stashed changes?",
        "options": ["git stash apply", "git stash pop", "git stash get", "git stash retrieve"],
        "correctAnswer": "git stash apply"
    },
    {
        "question": "What git command creates a lightweight tag?",
        "options": ["git tag <tag_name>", "git create-tag <tag_name>", "git add tag <tag_name>", "git new tag <tag_name>"],
        "correctAnswer": "git tag <tag_name>"
    },
    {
        "question": "Which command creates an annotated tag?",
        "options": ["git tag -a <tag_name> -m 'message'", "git tag --annotate <tag_name>", "git tag -m <tag_name>", "git tag -f <tag_name>"],
        "correctAnswer": "git tag -a <tag_name> -m 'message'"
    },
    {
        "question": "What git command lists all remote repositories?",
        "options": ["git remote -v", "git remotes", "git list-remotes", "git show remotes"],
        "correctAnswer": "git remote -v"
    },
    {
        "question": "Which command adds a new remote repository?",
        "options": ["git remote add <name> <url>", "git add remote <name> <url>", "git new remote <name> <url>", "git set remote <name> <url>"],
        "correctAnswer": "git remote add <name> <url>"
    },
    {
        "question": "What git command removes a remote repository?",
        "options": ["git remote rm <name>", "git remove remote <name>", "git delete remote <name>", "git remote erase <name>"],
        "correctAnswer": "git remote rm <name>"
    },
    {
        "question": "Which command sets the upstream branch for the current branch?",
        "options": ["git push -u origin <branch_name>", "git branch --set-upstream-to=origin/<branch_name>", "git set-upstream <branch_name>", "git config branch.<branch_name>.remote origin"],
        "correctAnswer": "git push -u origin <branch_name>"
    },
    {
        "question": "What git command is used to rebase your current branch onto another?",
        "options": ["git rebase <branch_name>", "git merge --rebase <branch_name>", "git checkout <branch_name> --rebase", "git sync <branch_name>"],
        "correctAnswer": "git rebase <branch_name>"
    },
    {
        "question": "Which command is used to revert a specific commit?",
        "options": ["git revert <commit_hash>", "git undo <commit_hash>", "git rollback <commit_hash>", "git reset --hard <commit_hash>"],
        "correctAnswer": "git revert <commit_hash>"
    },
    {
        "question": "What git command is used to inspect a specific commit?",
        "options": ["git show <commit_hash>", "git view <commit_hash>", "git inspect <commit_hash>", "git details <commit_hash>"],
        "correctAnswer": "git show <commit_hash>"
    },
    {
        "question": "Which command applies a patch from a specific commit?",
        "options": ["git cherry-pick <commit_hash>", "git apply <commit_hash>", "git patch <commit_hash>", "git transplant <commit_hash>"],
        "correctAnswer": "git cherry-pick <commit_hash>"
    },
    {
        "question": "What git command is used to compare two branches?",
        "options": ["git diff <branch1> <branch2>", "git compare <branch1> <branch2>", "git branch-diff <branch1> <branch2>", "git changes <branch1> <branch2>"],
        "correctAnswer": "git diff <branch1> <branch2>"
    },
    {
        "question": "Which command displays a diff of what's currently in the staging area versus the last commit?",
        "options": ["git diff --staged", "git diff --cached", "git diff --index", "git diff HEAD"],
        "correctAnswer": "git diff --cached"
    },
    {
        "question": "What git command is used to configure user name for commits?",
        "options": ["git config user.name 'Your Name'", "git set user.name 'Your Name'", "git username 'Your Name'", "git config --global user.name 'Your Name'"],
        "correctAnswer": "git config user.name 'Your Name'"
    },
    {
        "question": "Which command configures user email for commits?",
        "options": ["git config user.email 'your_email@example.com'", "git set user.email 'your_email@example.com'", "git email 'your_email@example.com'", "git config --global user.email 'your_email@example.com'"],
        "correctAnswer": "git config user.email 'your_email@example.com'"
    },
    {
        "question": "What git command checks out a specific commit?",
        "options": ["git checkout <commit_hash>", "git switch <commit_hash>", "git go <commit_hash>", "git select <commit_hash>"],
        "correctAnswer": "git checkout <commit_hash>"
    },
    {
        "question": "Which command is used to force a push to a remote repository?",
        "options": ["git push --force", "git push -f", "git push --force-with-lease", "Both git push --force and git push -f"],
        "correctAnswer": "Both git push --force and git push -f"
    },
    {
        "question": "What git command cleans up untracked files from the working directory?",
        "options": ["git clean -f", "git clean --force", "git scrub", "git tidy"],
        "correctAnswer": "git clean -f"
    },
    {
        "question": "Which command displays the current branch?",
        "options": ["git branch --show-current", "git branch", "git current-branch", "git status"],
        "correctAnswer": "git branch --show-current"
    },
    {
        "question": "What git command shows the difference between the working directory and the staging area?",
        "options": ["git diff", "git status -v", "git changes", "git compare-unstaged"],
        "correctAnswer": "git diff"
    },
    {
        "question": "Which command is used to add all new and modified files to the staging area?",
        "options": ["git add -A", "git add --all", "git add .", "All of the above"],
        "correctAnswer": "All of the above"
    },
    {
        "question": "What git command is used to create a new commit?",
        "options": ["git commit -m 'message'", "git add -m 'message'", "git save -m 'message'", "git new commit 'message'"],
        "correctAnswer": "git commit -m 'message'"
    },
    {
        "question": "Which command allows you to squash multiple commits into one interactive rebase?",
        "options": ["git rebase -i <commit_hash>", "git squash -i <commit_hash>", "git combine -i <commit_hash>", "git interactive-rebase <commit_hash>"],
        "correctAnswer": "git rebase -i <commit_hash>"
    },
    {
        "question": "What git command retrieves changes from a remote repository and integrates them?",
        "options": ["git pull", "git fetch --merge", "git clone --update", "git sync"],
        "correctAnswer": "git pull"
    },
    {
        "question": "Which command is used to change the last commit message?",
        "options": ["git commit --amend", "git commit --change", "git alter commit", "git amend last"],
        "correctAnswer": "git commit --amend"
    },
    {
        "question": "What git command is used to list all branches, including remote branches?",
        "options": ["git branch -a", "git branch --all", "git list branches", "git show branches"],
        "correctAnswer": "git branch -a"
    },
    {
        "question": "Which command shows the differences between commits?",
        "options": ["git diff <commit1> <commit2>", "git compare commits <commit1> <commit2>", "git log --diff <commit1> <commit2>", "git changes commits <commit1> <commit2>"],
        "correctAnswer": "git diff <commit1> <commit2>"
    },
    {
        "question": "What git command is used to restore a file to a previous version from the index or another commit?",
        "options": ["git checkout <commit> -- <file>", "git restore <file> --source=<commit>", "git reset <file>", "git revert <file>"],
        "correctAnswer": "git checkout <commit> -- <file>"
    },
    {
        "question": "Which command allows you to switch between branches or restore working tree files?",
        "options": ["git checkout", "git switch", "git move-to", "git branch --select"],
        "correctAnswer": "git checkout"
    },
    {
        "question": "What git command is used to remove files from the working directory and the index?",
        "options": ["git rm <file>", "git delete <file>", "git remove <file>", "git erase <file>"],
        "correctAnswer": "git rm <file>"
    },
    {
        "question": "Which command shows the current branch along with information about its upstream branch?",
        "options": ["git branch -vv", "git branch --verbose", "git status -v", "git remote show origin"],
        "correctAnswer": "git branch -vv"
    },
    {
        "question": "What git command is used to apply a commit from a different branch onto the current branch?",
        "options": ["git cherry-pick <commit_hash>", "git apply <commit_hash>", "git patch <commit_hash>", "git pick-commit <commit_hash>"],
        "correctAnswer": "git cherry-pick <commit_hash>"
    },
    {
        "question": "Which command is used to interactively stage parts of modified files?",
        "options": ["git add -p", "git add --patch", "git add -i", "Both git add -p and git add --patch"],
        "correctAnswer": "Both git add -p and git add --patch"
    },
    {
        "question": "What git command is used to list all stashed changes?",
        "options": ["git stash list", "git stash show", "git stash view", "git stash history"],
        "correctAnswer": "git stash list"
    },
    {
        "question": "Which command is used to delete a specific stash?",
        "options": ["git stash drop <stash_id>", "git stash delete <stash_id>", "git stash remove <stash_id>", "git stash clear <stash_id>"],
        "correctAnswer": "git stash drop <stash_id>"
    }
];

FROM node:14.15.5-alpine3.13

RUN apk update && \
    apk add --no-cache yarn git nano zsh-vcs && \    
    git config --global credential.helper 'cache --timeout=7200' && \
    git config --global init.defaultBranch main && \
    git config --global color.ui true && \
    git config --global user.email "gilson@codemastersolucoes.com" && \
    git config --global user.name "Gilson Gabriel"

RUN yarn global add express-generator

RUN wget https://github.com/deluan/zsh-in-docker/releases/download/v1.1.1/zsh-in-docker.sh

RUN chmod +x zsh-in-docker.sh

RUN ./zsh-in-docker.sh \
    -t https://github.com/denysdovhan/spaceship-prompt \
    -a 'SPACESHIP_PROMPT_ADD_NEWLINE="false"' \
    -a 'SPACESHIP_PROMPT_SEPARATE_LINE="false"' \
    -p git \
    -p https://github.com/zsh-users/zsh-autosuggestions \
    -p https://github.com/zsh-users/zsh-completions \
    -p https://github.com/zsh-users/zsh-history-substring-search \
    -p https://github.com/zsh-users/zsh-syntax-highlighting \
    -p 'history-substring-search' \
    -a 'bindkey "\$terminfo[kcuu1]" history-substring-search-up' \
    -a 'bindkey "\$terminfo[kcud1]" history-substring-search-down'

COPY ./.zshrc /root/

EXPOSE 3333

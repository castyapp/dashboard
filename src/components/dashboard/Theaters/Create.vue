<template>

    <div class="create_theater p-2">

        <div class="title-border-bottom pb-2">
            <strong class="side-component-title">
                <i class="icofont-ui-movie text-primary mr-2"></i>
                Create a new theater
            </strong>
            <small class="border-left-title">
                You can create a new theater here.
            </small>
        </div>

        <div class="clearfix"></div>

        <div class="form-dark m-3 pt-2">

            <div class="form-group">

                <label for="theater_name">
                    <i class="icofont-ui-movie mr-1"></i>
                    Theater name
                </label>

                <input type="text"
                       class="form-control"
                       id="theater_name"
                       placeholder="Enter your theater name here"
                       v-model="theater_name"
                       required="required"
                       autocomplete="off" />

                <div v-if="errors.title !== null" class="text-danger text-left errors">
                    <p v-for="err in errors.title">{{ err }}</p>
                </div>

            </div>

            <div class="form-group">

                <label for="movie_uri">
                    <i class="icofont-link mr-1"></i>
                    Movie uri
                    <small>You can use youtube or movie download uri</small>
                </label>

                <input type="text"
                       class="form-control"
                       id="movie_uri"
                       placeholder="Enter your movie download url or an youtube video"
                       v-model="movie_uri"
                       required="required"
                       autocomplete="off"
                       aria-describedby="movie-uri" />

                <div v-if="errors.movie_uri !== null" class="text-danger text-left errors">
                    <p v-for="err in errors.movie_uri">{{ err }}</p>
                </div>

            </div>

            <div class="form-group">

                <label>
                    <i class="icofont-safety-hat mr-1"></i>
                    Select your Theater Privacy
                </label>
                <div class="clearfix"></div>
                <DropdownMenu :config="privacy_config" @setSelectedOption="setNewSelectedOption($event)" />

                <div v-if="errors.privacy !== null" class="text-danger text-left errors">
                    <p v-for="err in errors.privacy">{{ err }}</p>
                </div>

                <div class="custom-control custom-switch mt-3" v-show="privacy.id !== 3">
                    <input type="checkbox"
                           class="custom-control-input"
                           v-model="player_access"
                           id="trust_switch"
                           checked />
                    <label class="custom-control-label" for="trust_switch">
                        Everyone can control the video player!
                    </label>
                </div>

                <div v-if="errors.video_player_access !== null" class="text-danger text-left">
                    <p v-for="err in errors.video_player_access">{{ err }}</p>
                </div>

            </div>

            <div class="mt-3 form-group p-3">

                <div class="row">

                    <div class="col-md-6">

                        <label for="movie_banner" class="ml-2">
                            <i class="icofont-picture mr-1"></i>
                            Movie banner
                            <small class="text-warning">optional</small>
                        </label>

                        <div class="clearfix"></div>

                        <div class="box has-advanced-upload full-width file-upload"
                             @dragover.prevent
                             @drop="onDropInMovieBanner"
                             @click="onClickFileInput">

                            <div class="box__input">

                                <div class="preview" v-if="movie_banner">
                                    <div class="file-upload-preview">

                                        <img class="file-upload-preview-img"
                                             :src="movie_banner"
                                             @click="onClickFileInput"
                                             alt="movie_banner" />

                                        <button type="button" class="btn btn-danger" @click="removeBanner">
                                            <i class="icofont-close"></i>
                                        </button>

                                    </div>
                                </div>

                                <div v-if="!movie_banner">

                                    <i class="box__icon icofont-image"></i>
                                    <div class="clearfix"></div>

                                    <input class="box__file"
                                           type="file"
                                           id="movie_banner"
                                           @change="onChangeMovieBanner"
                                           accept="image/*" />

                                    <label for="movie_banner">
                                        <strong class="border-bottom">
                                            Choose a picture
                                        </strong>
                                        <span class="box__dragndrop">
                                            or drag it here.
                                        </span>
                                    </label>

                                </div>
                            </div>

                        </div>

                    </div>

                    <div class="col-md-6">

                        <label for="movie_subtitles" class="ml-2">
                            <i class="icofont-cc mr-1"></i>
                            Movie subtitles
                            <small class="text-warning">optional</small>
                        </label>

                        <div class="clearfix"></div>

                        <div class="box">

                            <div class="subtitles">

                                <div class="subtitle row" :key="index" v-for="(subtitle, index) in subtitles">

                                    <input type="text"
                                        class="form-control subtitle-language col-md-2"
                                        placeholder="Lang"
                                        v-model="subtitle.lang"
                                        autocomplete="off" />

                                    <input :id="'subtitle-' + index" 
                                        type="file"
                                        class="form-control hidden"
                                        autocomplete="off"
                                        @change="onChangeSubtitle($event, index)" />

                                    <button type="button" class="choose-subtitle-btn col-md-8" @click="onClickAddSubtitle(index)">
                                        {{ subtitle.file.name !== undefined ? subtitle.file.name : 'Choose your subtitle' }}
                                        <i class="icofont-file-text"></i>
                                    </button>

                                    <button type="button" class="remove-subtitle-btn" v-if="index !== 0" @click="removeSubtitle(index)">
                                        <i class="icofont-trash"></i>
                                    </button>

                                </div>

                            </div>

                            <button type="button" class="plus-subtitle-btn" @click="addSubtitle" v-if="subtitles.length < 10">
                                <i class="icofont-plus"></i>
                                Add another one
                            </button>

                        </div>

                    </div>

                </div>

            </div>

            <div class="buttons clearfix">

                <VueLoadingButton
                    @click.native="create"
                    :loading="loading"
                    type="button"
                    class="btn btn-outline-primary pull-right ml-3">
                    Create
                    <i class="icofont-arrow-right"></i>
                </VueLoadingButton>

               <!-- <button type="button" class="btn btn-warning pull-right" v-show="privacy.id !== 3" @click="createAndShare">
                   Create and share it with your friends
                   <i class="icofont-arrow-right"></i>
                </button> -->

            </div>

        </div>

    </div>

</template>

<style scoped>

    .form-dark > .form-group input.subtitle-language {
        float: left;
        background: #202020 !important;
    }

    button.choose-subtitle-btn:hover {
        background: #141313 !important;
        color: #6c757d;
    }

    .subtitles {
        margin: 8px 0;
    }

    button.choose-subtitle-btn {
        background: #202020;
        color: #6c757d;
        border-radius: 3px;
        border: none;
        padding: 7px 20px;
        margin-left: 10px;
    }

    .subtitle {
        width: 100%;
        margin: 0 0 10px 0;
    }

    button.plus-subtitle-btn {
        background: #077bff;
        border: none;
        border-radius: 2px;
        font-size: 14px;
        font-weight: 100;
        color: #ffffff;
        margin-left: 2px;
    }

    button.remove-subtitle-btn {
        border: none;
        padding: 5px 15px;
        background: transparent;
        color: #F44336;
    }

</style>

<script>

    const $ = require("jquery");

    import VueLoadingButton from 'vue-loading-button'
    import "bootstrap-select/dist/js/bootstrap-select.js";
    import "bootstrap-select/dist/css/bootstrap-select.css";
    import DropdownMenu from "./../../models/dropdown-menu/DropdownMenu";

    const MovieTypeUNKNOWN = 0,
        MovieTypeYOUTUBE = 1,
        MovieTypeURI = 2,
        MovieTypePIRATE_BAY = 3,
        LOCAL_PATH = 4;

    export default {
        name: 'CreateTheater',
        components: {
            DropdownMenu,
            VueLoadingButton,
        },
        data() {
            return {
                player_access: true,
                theater_name: "",
                movie_uri: "",
                movie: {
                    uri: "",
                    type: MovieTypeUNKNOWN,
                },
                subtitles: [
                    {
                        lang: "",
                        file: {},
                    },
                ],
                loading: false,
                poster: null,
                movie_banner: null,
                movie_file: null,
                errors: {},
                privacy: {
                    id: 1,
                    value: "Public",
                    icon: "icofont-globe",
                    description: "Everybody has access to your theater!"
                },
                privacy_config: {
                    options: [
                        {
                            id: 1,
                            value: "Public",
                            icon: "icofont-globe",
                            description: "Everybody has access to your theater!"
                        },
                        {
                            id: 2,
                            value: "Friends",
                            icon: "icofont-users",
                            description: "Only your friends have access to your theater!"
                        },
                        {
                            id: 3,
                            value: "Private",
                            icon: "icofont-user",
                            description: "Only you have access to your theater!"
                        },
                    ],
                    placeholder: "Public",
                    borderRadius: "3px",
                    backgroundColor: "#131212",
                    border: "none",
                    textColor: "#eeeeee",
                    textSize: 14,
                },
            }
        },
        watch: {
            movie_uri(value) {
                if (value === null || value === ""){
                    this.movie = {type: MovieTypeUNKNOWN, uri: ""};
                } else {
                    this.movie = this.parseMovieUri(value);
                }
            },
        },
        methods: {
            onChangeSubtitle(e, index) {
                let files = e.target.files;
                this.subtitles[index].file = files[0];
            },
            onClickAddSubtitle(index) {
                $(`input#subtitle-${index}`).trigger("click");
            },
            removeSubtitle(index) {
                this.subtitles.splice(index, 1)
            },
            addSubtitle() {
                if (this.subtitles.length < 10) {
                    this.subtitles.push({
                        lang: "",
                        file: {},
                    });
                }
            },
            parseMovieUri(uri) {
                try {
                    let parser = new URL(uri);
                    let urlParams = new URLSearchParams(parser.search);
                    if (this.isYoutube(uri)) {
                        return {type: MovieTypeYOUTUBE, uri: urlParams.get("v")}
                    }
                    return {type: MovieTypeURI, uri: uri}
                } catch (e) {
                    return {type: MovieTypeURI, uri: uri}
                }
            },
            isYoutube(uri) {
                const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/watch\?v=/s;
                return regex.exec(uri) !== null;
            },
            setNewSelectedOption(selectedOption) {
                this.privacy_config.placeholder = selectedOption.value;
                this.privacy = selectedOption;
            },
            onDropInMovieBanner(e) {
                e.stopPropagation();
                e.preventDefault();
                let files = e.dataTransfer.files;
                this.readMovieBannerFile(files[0]);
            },
            onChangeMovieBanner(e) {
                let files = e.target.files;
                this.readMovieBannerFile(files[0]);
            },
            readMovieBannerFile(file) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    this.movie_banner = e.target.result;
                    this.poster       = file;
                };
                reader.readAsDataURL(file);
            },
            removeBanner() {
                this.movie_banner = null;
            },
            onClickFileInput(e) {
                $(e.target).find("input[type=file]").trigger("click");
            },
            getTheaterObject() {
                return {
                    title:         this.theater_name,
                    movie_uri:     this.movie.uri,
                    type:          this.movie.type,
                    privacy:       this.privacy.id,
                    poster:        this.poster,
                    subtitles:     this.subtitles,
                    player_access: this.player_access,
                };
            },
            create() {

                this.loading = true;

                let theater = this.getTheaterObject();
                this.$store.dispatch("createTheater", theater).then(async (response) => {

                    let insertedID = response.data.result.result;

                    await theater.subtitles.forEach(subtitle => {
                        if (subtitle.lang !== '') {
                            this.$store.dispatch('addSubtitleToTheater', {subtitle, insertedID});
                        }
                    });

                    this.$router.push({
                        name: "library",
                        params: {reload: true},
                    }).then(() => {
                        this.$notify({
                            group: 'dashboard',
                            type: 'success',
                            text: "Theater created successfully!",
                            title: "Success",
                            duration: 2000,
                        });
                        this.loading = false;
                    });
                }).catch(err => {
                    if (err.response !== undefined) {
                        this.errors = err.response.data.result;
                    }
                    this.$notify({
                        group: 'dashboard',
                        type: 'error',
                        text: "Failed to create theater, Please check form errors!",
                        title: "Failed",
                        duration: 2000,
                    });
                    this.loading = false;
                });
            },
            createAndShare() {
                let theater = this.getTheaterObject();
                console.log(theater);
            }
        },
    }
</script>

<style>

    .selected-subtitle > small {
        font-size: 13px;
    }

    .selected-subtitle {
        background: #333334;
        height: 100%;
        align-items: center;
        display: grid;
        color: #ffffff;
        font-size: 30px;
    }

    small.text-muted {
        color: #b3b3b3 !important;
    }

    .choosed-movie > .form-control {
        background: #007bff !important;
    }

    .file-upload-preview button {
        position: absolute;
        right: 20px;
        top: 20px;
        padding: 0 5px;
    }

    .file-upload {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        position: relative;
        cursor: pointer;
        overflow: hidden;
        width: 100%;
        max-width: 100%;
        height: 200px;
        padding: 5px 10px;
        font-size: 1rem;
        text-align: center;
        color: #ccc;
    }

    .file-upload-preview {
        position: absolute;
        z-index: 1;
        padding: 15px;
        width: 100%;
        height: 100%;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: hidden;
        text-align: center;
    }

    .file-upload-preview-img {
        width: 100%;
        height: 100%;
        background-color: #fff;
        -webkit-transition: border-color .15s linear;
        -o-transition: border-color .15s linear;
        transition: border-color .15s linear;
        -o-object-fit: cover;
        object-fit: cover;
    }

    button.input-group-text {
        background: #333334;
        color: #fff;
        border: 0;
    }

    button.input-group-text:hover {
        background: #007bff;
        color: #fff;
        border: 0;
    }

    .box__input {
        text-align: center;
    }

    .box__file {
        width: 0;
        height: 0;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
    }

    .box__file + label {
        max-width: 80%;
        cursor: pointer;
        display: inline-block;
        overflow: hidden;
    }

    .has-advanced-upload:hover {
        background: #262829 !important;
    }

    .box.has-advanced-upload .box__icon {
        color: aliceblue;
        font-size: 90px;
        margin: 10px auto;
        opacity: 0.5;
        pointer-events: none;
    }

    .box__dragndrop,
    .box__uploading,
    .box__success,
    .box__error {
        display: none;
    }

    .box.has-advanced-upload {
        background-color: #181818;
        outline: 2px dashed #333334;
        outline-offset: -10px;
        height: 200px;
    }

    .box.has-advanced-upload .box__dragndrop {
        display: inline;
    }

    .box.is-dragover {
        background-color: grey;
    }

    .box.is-uploading .box__uploading {
        display: block;
    }

    .box__button {
        display: none;
    }
    .no-js .box__button {
        display: block;
    }

    .form-control:focus {
        border-color: inherit;
        -webkit-box-shadow: none;
        box-shadow: none;
    }

    .form-dark .form-group .form-control {
        background: #181818;
        color: #fff;
        border: none;
    }

    .errors > p {
        padding: 0;
        margin: 5px;
        font-size: 14px;
        font-weight: 100;
    }

    .movie-preview-container {
        background: #131212;
        margin: 10px 0;
        padding: 10px;
        border-radius: 5px;
        height: 100px;
    }

    .movie-preview {
        width: 200px;
        height: 100px;
        float: left;
    }

    .movie-preview {
        width: 150px;
        height: 80px;
        float: left;
        background: #333;
        border-radius: 5px;
        margin-right: 10px;
    }

</style>
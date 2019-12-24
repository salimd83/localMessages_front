<template>
  <div class="edit-avatar" v-if="user">
    <div class="back">
      <a href="" @click.prevent="$router.back()">Back</a>
    </div>
    <div class="profile-image">
      <img :src="user.avatar" :key="key" alt />
    </div>
    <button class="danger" @click="deleteAvatar">Delete</button>
    <form @submit.prevent="editAvatar">
      <label for="upload-avatar" class="d-block mb-2 mt-5">Upload profile image</label>
      <input
        type="file"
        accept="image/*"
        required
        name="avatar"
        id="upload-avatar"
        class="d-block"
        @change="e => {this.selectedFile = e.target.files[0]; setupCropper(e.target.files[0])}"
      />
      <div class="preview-avatar" v-if="objectUrl">
        <div class="cropper">
          <img :src="objectUrl" ref="source" alt />
        </div>
        <div class="preview">
          <img :src="previewCropped" width="300" alt />
        </div>
      </div>
      <button type="submit" v-if="objectUrl">Save</button>
      <button @click.prevent="cancelCropper" v-if="objectUrl">Cancel</button>
      <p class="danger" v-if="error">{{error}}</p>
    </form>
  </div>
</template>

<script>
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import debounce from "lodash/debounce";

export default {
  name: "EditAvatar",
  data() {
    return {
      key: 4,
      error: null,
      cropper: null,
      objectUrl: null,
      previewCropped: null,
      selectedFile: null,
      debouncedUpdatePreview: debounce(this.updatePreview, 257)
    };
  },
  computed: {
    user() {
      return this.$store.state.profile;
    },
    apiUrl() {
      return process.env.VUE_APP_API_URL;
    }
  },
  methods: {
    async editAvatar(event) {
      this.error = null;

      const canvas = this.cropper.getCroppedCanvas();

      canvas.toBlob(async blob => {
        const formData = new FormData();

        formData.append("avatar", blob, "avatar.png");

        try {
          await this.axios.post("/user/me/avatar", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          });
          this.key++;
          this.user.avatar = this.user.avatar + `?update${this.key}`;
          this.$store.commit("setProfile", { profile: this.user });
          this.cancelCropper();
        } catch (e) {
          console.log(e);
          this.error = e.message;
        }
      });
    },
    async deleteAvatar() {
      this.error = null;
      await this.axios.delete("user/me/avatar");
      this.key++;
      this.user.avatar = this.user.avatar + `?update${this.key}`;
      this.$store.commit("setProfile", { profile: this.user });
    },
    cancelCropper() {
      this.cropper = null;
      this.objectUrl = null;
      this.previewCropped = null;
    },
    setupCropper(selectedFile) {
      if (this.cropper) {
        this.cropper.destroy();
      }

      if (this.objectUrl) {
        window.URL.revokeObjectURL(this.objectUrl);
      }

      if (!selectedFile) {
        this.cropper = null;
        this.objectUrl = null;
        this.previewCropped = null;
        return;
      }

      this.objectUrl = window.URL.createObjectURL(selectedFile);
      this.$nextTick(this.setupCropperInstance);
    },
    setupCropperInstance() {
      this.cropper = new Cropper(this.$refs.source, {
        aspectRatio: 1,
        crop: this.debouncedUpdatePreview
      });
    },
    updatePreview() {
      const canvas = this.cropper.getCroppedCanvas();
      this.previewCropped = canvas.toDataURL("image/png");
    }
  }
};
</script>

<style lang="scss" scoped>
.profile-image {
  width: 180px;
  height: 180px;
  border-radius: 100%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
.preview-avatar {
  display: flex;
  .cropper,
  .preview {
    width: 250px;
    height: 250px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .preview {
    border-radius: 100%;
    overflow: hidden;
  }
}
</style>

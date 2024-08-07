<template>
    <div class="baklava-file-interface">
        <input
            type="file"
            @change="handleFileChange"
            :placeholder="intf.name"
            :title="intf.name"
            class="baklava-input"
        />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import type { FileInterface } from "./FileInterface";

export default defineComponent({
    props: {
        intf: {
            type: Object as () => FileInterface,
            required: true,
        },
        modelValue: {
            type: String,
            required: true,
        },
    },
    emits: ["update:modelValue"],
    setup(props, { emit }) {
        const v = computed({
            get: () => props.modelValue,
            set: (v) => {
                emit("update:modelValue", v);
            },
        });

        const handleFileChange = (event: Event) => {
            const fileInput = event.target as HTMLInputElement;
            if (fileInput.files && fileInput.files.length > 0) {
                const file = fileInput.files[0];
                const reader = new FileReader();
                reader.onload = (e) => {
                    const result = e.target?.result as string;
                    emit("update:modelValue", result);
                };
                reader.readAsText(file);
            }
        };

        return { v, handleFileChange };
    },
});
</script>

<style scoped>
.baklava-file-interface {
    display: flex;
    flex-direction: column;
}

.baklava-input {
    margin-top: 8px;
}
</style>

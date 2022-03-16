<template>
    <v-col cols="9" class="d-flex align-center">
        <v-radio-group
            v-model="source"
            row
            small
            v-for="item in sources" :key="'source'+item.value"
        >
            <v-radio
            :label="item.text"
            :value="item.value"
            :disabled="isDisabled(1,item.value)"
            ></v-radio>
        </v-radio-group>
        <v-icon left>
            mdi-arrow-right-bold
            </v-icon>
        <v-radio-group
            v-model="target"
            row
            v-for="item in targets" :key="item.value"
        >
            <v-radio
            :label="item.text"
            :value="item.value"
            :disabled="isDisabled(2,item.value)"
            ></v-radio>
        </v-radio-group>
        <v-btn
            color="#f7ec77"
            @click=doneTask(task.id)
            small
            depressed
        >
            <v-icon left>
            mdi-sync
            </v-icon>
            SYNC
        </v-btn>
        </v-col>
</template>
<script>
  export default {
    data: () => ({
        source: null,
        target: null,
        sources: [{'value': 1, 'text': 'Local'},{'value': 2, 'text': 'Firebase'},{'value': 3, 'text': 'Server'}],
        targets: [{'value': 1, 'text': 'Local'},{'value': 2, 'text': 'Firebase'},{'value': 3, 'text': 'Server'}],
    }),

    methods: {
        isDisabled(i,value) {
            if((i==1 && value == this.target) ||(i==2 && value == this.source))
                return true; 
            return false;
        }
    },
    computed: {
        
        // isDisabled(value) {
        //     let a = value
        //     if((this.source && value == this.source) || (this.target && value == this.target)) 
        //         return true; 
        //     if(a)
        //         return false;
        //     return false
        // }
    },

    watch: {
        source: {
            handler(newValue) {
                let arrValues = [1,2,3].filter(v => v!= newValue)
                this.target = arrValues[0]
            },
        },
        target: {
            handler(newValue) {
                let arrValues = [1,2,3].filter(v => v!= newValue)
                this.source = arrValues[0]
            },
        }
        // source: {
        //     handler(newValue) {
        //         this.targets.forEach(v => {
        //             if(v.value == newValue)
        //                 v.disabled = true
        //             else
        //                 v.disabled = false
        //         })
        //     },
        // },
        // target: {
        //     handler(newValue) {
        //         this.sources.forEach(v => {
        //             if(v.value == newValue)
        //                 v.disabled = true
        //             else
        //                 v.disabled = false
        //         })
        //     },
        // }
    }
  }
</script>
<template>
    <li :data-id="actualFriend.id"
        :class="stateClass"
        @contextmenu.prevent="$parent.$parent.$refs.menu.open($event, 'friend-menu', actualFriend)">

        <router-link class="friend"
            :to="{ name: 'messages', params: { friend_id: actualFriend.username, actualFriend }}">

            <div class="avatar">
                <img :src="cdnUrl + '/avatars/' + actualFriend.avatar + '.png'"
                        alt="Avatar" />
                <i class="state-dot"></i>
            </div>

            <div class="innerDetails">
                <div class="username">
                    <strong>{{ actualFriend.fullname }}</strong>
                </div>
                <div class="activity" v-if="hasActivity">
                    {{ activity }}
                </div>
            </div>

            <span v-show="badgeCount > 0" class="unread-badge-friendlist">
                {{ badgeCount }}
            </span>

        </router-link>

    </li>
</template>

<script>
    
    import {proto} from 'casty-proto/pbjs/ws.bundle'

    export default {
        props: ['friend'],
        data() {
            return {
                state: proto.PERSONAL_STATE.ONLINE,
                hasActivity: false,
                activity: '',
                badgeCount: 0,
                stateClass: 'offline',
                actualFriend: null,
            }
        },
        methods: {
            updateFriend(friend) {
                this.actualFriend = friend
            },
            getStateName(state) {
                switch (state) {
                    case proto.PERSONAL_STATE.ONLINE: return "online";
                    case proto.PERSONAL_STATE.BUSY: return "busy";
                    case proto.PERSONAL_STATE.IDLE: return "idle";
                    default:
                        return "offline"
                }
            },
            updateState(state) {
                this.state = state
                switch (state) {
                    case proto.PERSONAL_STATE.ONLINE: 
                        this.stateClass = "online";
                        break
                    case proto.PERSONAL_STATE.BUSY: 
                        this.stateClass = "busy";
                        break
                    case proto.PERSONAL_STATE.IDLE:
                        this.stateClass = "idle";
                        break
                    default:
                        this.stateClass = "offline";
                        break
                }
            },
            updateActivity(event) {
                if (!event.hasOwnProperty('activity')) {
                    this.hasActivity = false;
                    this.activity = '';
                } else {
                    this.hasActivity = true;
                    this.activity = `Watching ${getStringSub(event.activity.activity, 18)}`
                }   
            },
            addBadgeCount() {
                this.badgeCount++
            },
            removeBadgeCount() {
                this.badgeCount = 0
            }
        },
        created() {
            this.actualFriend = this.friend;
        }
    }

</script>
// @flow
import firebase from 'react-native-firebase';
import levels from './Levels';

export default {
    /**
     * Variable to access internal functions through promises.
     */

    dbParent: this,

    /**
     * Stores all the tasks that still need pushing to the database
     */

    taskResults: [],
    groupCompletes: [],

    /**
     * These functions determine whether there is a level up that needs to be popped up.
     */

    pendingLvlUp: -1,

    getPendingLevelUp() {
        return this.pendingLvlUp;
    },

    setPendingLevelUp(val: number) {
        this.pendingLvlUp = val;
    },

    // the max level in the app
    maxLevel: 36,

    /**
     * Returns the current level of the user
     * @returns {*}
     */
    getLevel() {
        return this.getLevelForExp(this.distance);
    },

    /**
     * Returns the entire level object, mainly for showing the badge
     * @returns {*}
     */
    getLevelObject() {
        return levels[this.getLevel()];
    },

    /**
     * Get a custom level object based on level (shown for level ups)
     * @param customLevel
     * @returns {*}
     */
    getCustomLevelObject(customLevel: number): {} {
        return levels[customLevel];
    },

    /**
     * Get the level for the exp
     * @param exp
     * @returns {number}
     */

    getLevelForExp(exp: number): number {
        let toReturn = 1;
        try {
            const parent = this;
            Object.keys(levels).forEach((level) => {
                if (exp > levels[parent.maxLevel]) {
                    toReturn = parent.maxLevel;
                } else if (
                    exp > levels[level].expRequired &&
                    exp < levels[parseInt(level, 10) + 1].expRequired
                ) {
                    toReturn = level;
                }
            });
            if (toReturn > this.maxLevel) {
                toReturn = this.maxLevel;
            } else if (toReturn < 1) {
                toReturn = 1;
            }
        } catch (err) {
            console.log(err);
        }
        return toReturn;
    },

    /**
     * Returns the firebase timestamp
     */
    getTimestamp() {
        return firebase.database().getServerTime();
    },

    /**
     * Handles the initial loading of the app (what we consider login)
     * to see if the user has already used MapSwipe before.
     * @returns {Promise}
     */
    offlineGroups: [],
    interval: null,

    totalRequests: {},
    totalRequestsOutstanding2: {},
    totalRequestsOutstandingByGroup: {},
    isDownloading: {},

    /**
     * Whether the project has any offline groups
     * @param project
     * @returns {boolean}
     */
    hasOfflineGroups(project: string): boolean {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < this.offlineGroups.length; i++) {
            if (this.offlineGroups[i].indexOf(project) !== -1) {
                return true;
            }
        }
        return false;
    },

    /**
     * Whether the project has any open downloads
     * @param project
     * @returns {boolean}
     */

    hasOpenDownloads(project: string): boolean {
        console.log(project);
        return false;
    },
};

/**
 * Format the project progress for display
 */
export function getProjectProgressForDisplay(progress: number): string {
    let r;
    if (progress < 99) {
        r = Math.max(0, progress).toFixed(0);
    } else if (progress < 100) {
        r = '99';
    } else {
        r = '100';
    }
    return r;
}

/**
 * Calculate how much 1 tile is in square kilometers
 * @param zoomLevel
 * @returns {number}
 */
export function getSqKmForZoomLevelPerTile(zoomLevel: number): number {
    if (zoomLevel === 23) {
        return 2.29172838e-5;
    }
    if (zoomLevel === 22) {
        return 9.11795814e-5;
    }
    if (zoomLevel === 21) {
        return 0.000364718326;
    }
    if (zoomLevel === 20) {
        return 0.00146082955;
    }
    if (zoomLevel === 19) {
        return 0.00584331821;
    }
    if (zoomLevel === 18) {
        return 0.0233732728; // (((0.5972 * 256) ^ 2) / (1000 ^ 2))
    }
    if (zoomLevel === 17) {
        return 0.0934774368;
    }
    if (zoomLevel === 16) {
        return 0.373941056;
    }
    if (zoomLevel === 15) {
        return 1.4957016;
    }
    if (zoomLevel === 14) {
        return 5.98280642;
    }
    if (zoomLevel === 13) {
        return 23.9314761;
    }
    if (zoomLevel === 12) {
        return 95.7254037;
    }
    return 95.72;
}

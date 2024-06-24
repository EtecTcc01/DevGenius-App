import { storeUserData } from "../../functions/async.services";
import { getAchievement, levelUpdate, userAchievementRegister } from "../../functions/helper.services"
import { getUserData } from "../../functions/user.services";

export async function achievementValidation(test, achievements, user) {

    if (test) {

        if (test.key === "game_over") {

            let validation = true

            if (achievements.length > 0) {
                achievements.forEach((element) => {
                    if (element.id_achievement === 3) {
                        validation = false
                        console.log("Usuário já possui tal conquista")
                    }
                });
            }

            if (validation === true && test.item <= 0) {
                try {
                    let data = await userAchievementRegister(user, 3)

                    if (data === false) {
                        console.log("Erro ao adicionar conquista ao perfil do usuário.")
                        return
                    }
                    console.log("Conquista adicionada com sucesso")
                    await userDataUpdt(user, 3)

                    return true
                } catch (error) {

                }
            }
        }
    }
}

async function userDataUpdt(userId) {

    try {
        let user = await getUserData(userId)

        let achievement = await getAchievement(3)

        let progress = {
            userLevel: user._level,
            totalExp: user.total_exp + achievement._exp,
            userId: user.id_user
        }

        if (progress.totalExp >= 10) {
            while (progress.totalExp >= 10) {
                progress.totalExp -= 10
                progress.userLevel += 1
            }
        }

        user._level = progress.userLevel
        user.total_exp = progress.totalExp

        levelUpdate(progress)
            .then((result) => {
                if (result === false) {
                    console.log("Erro ao atualizar info do usuário.")
                    return
                }

                storeUserData({ user: user })
                    .then((res) => {
                        if (!res) {
                            console.log("Erro ao armazenar os dados do usuário")
                            return
                        }
                        
                        console.log("Dado atualizados com sucesso.")
                    })
            })

    } catch (error) {
        console.log("Erro ao atualizar os dados do usuário (Conquista).")
    }
}
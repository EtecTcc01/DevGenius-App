import { userAchievementRegister } from "../../functions/helper.services"

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
                    return true
                } catch (error) {

                }
            }
        }
    }
}
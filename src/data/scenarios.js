export const scenarios = [
    {
        id: 'negotiation-seoul',
        title: 'Negociación de Salario en Seúl',
        language: 'kr',
        startNode: 'node_1',
        nodes: {
            'node_1': {
                id: 'node_1',
                speaker: 'Director Park',
                role: 'CEO',
                emotion: 'neutral',
                dialogue: '어서 오세요. 포트폴리오를 검토했습니다. 연봉에 대해 이야기해 봅시다.',
                translation: 'Bienvenido. He revisado su portafolio. Hablemos sobre el salario.',
                choices: [
                    {
                        text: '¡Oye! Quiero ganar mucho dinero.',
                        subtext: '(Informal / Descortés)',
                        nextId: 'node_fail_1',
                        confidenceChange: -30
                    },
                    {
                        text: 'Es un honor estar aquí, Director Park. Gracias por su tiempo.',
                        subtext: '(Formal / Honorífico)',
                        nextId: 'node_2',
                        confidenceChange: 15
                    }
                ]
            },
            'node_2': {
                id: 'node_2',
                speaker: 'Director Park',
                role: 'CEO',
                emotion: 'happy',
                dialogue: '예의가 바르시군요. 우리 회사에서 기대하는 급여 수준은 어느 정도입니까?',
                translation: 'Es usted muy cortés. ¿Cuál es su expectativa salarial en nuestra empresa?',
                choices: [
                    {
                        text: '60 millones de won, y quiero 4 semanas de vacaciones.',
                        subtext: '(Directo / Agresivo)',
                        nextId: 'node_fail_2',
                        confidenceChange: -20
                    },
                    {
                        text: 'Creo que mis habilidades pueden aportar valor. Estoy abierto a discutirlo según los estándares de la empresa.',
                        subtext: '(Humilde / Profesional)',
                        nextId: 'node_success',
                        confidenceChange: 20
                    }
                ]
            },
            'node_fail_1': {
                id: 'node_fail_1',
                speaker: 'Director Park',
                role: 'CEO',
                emotion: 'angry',
                dialogue: '...무례하군요. 인터뷰는 여기까지입니다.',
                translation: '...Qué grosero. La entrevista termina aquí.',
                choices: [],
                end: true,
                success: false
            },
            'node_fail_2': {
                id: 'node_fail_2',
                speaker: 'Director Park',
                role: 'CEO',
                emotion: 'annoyed',
                dialogue: '요구가 지나치군요. 다시 생각해 봐야겠습니다.',
                translation: 'Sus demandas son excesivas. Tendré que reconsiderarlo.',
                choices: [],
                end: true,
                success: false
            },
            'node_success': {
                id: 'node_success',
                speaker: 'Director Park',
                role: 'CEO',
                emotion: 'happy',
                dialogue: '좋습니다. 긍정적으로 검토하겠습니다. 함께 일하기를 기대합니다.',
                translation: 'Bien. Lo consideraré positivamente. Espero trabajar con usted.',
                choices: [],
                end: true,
                success: true
            }
        }
    },
    {
        id: 'negotiation-tokyo',
        title: 'Reunión en Tokio',
        language: 'jp',
        startNode: 'node_1',
        nodes: {
            'node_1': {
                id: 'node_1',
                speaker: 'Tanaka-san',
                role: 'Director',
                emotion: 'neutral',
                dialogue: 'はじめまして。田中です。よろしくお願いします。',
                translation: 'Encantado. Soy Tanaka. Es un placer conocerle.',
                choices: [
                    {
                        text: 'Hola Tanaka, ¿qué tal todo?',
                        subtext: '(Informal)',
                        nextId: 'node_fail_1',
                        confidenceChange: -40
                    },
                    {
                        text: '(Hacer una reverencia profunda y entregar tarjeta de visita con ambas manos)',
                        subtext: '(Protocolo de Negocios)',
                        nextId: 'node_2',
                        confidenceChange: 20
                    }
                ]
            },
            'node_2': {
                id: 'node_2',
                speaker: 'Tanaka-san',
                role: 'Director',
                emotion: 'happy',
                dialogue: '素晴らしい名刺ですね。では、プロジェクトについて話しましょう。',
                translation: 'Excelente tarjeta de visita. Hablemos del proyecto.',
                choices: [
                    {
                        text: 'Sí, mi plan es el mejor. Escúcheme bien.',
                        subtext: '(Arrogante)',
                        nextId: 'node_fail_2',
                        confidenceChange: -20
                    },
                    {
                        text: 'Gracias. Nos gustaría escuchar sus valiosos comentarios primero.',
                        subtext: '(Respetuoso / Escucha Activa)',
                        nextId: 'node_success',
                        confidenceChange: 20
                    }
                ]
            },
            'node_fail_1': {
                id: 'node_fail_1',
                speaker: 'Tanaka-san',
                role: 'Director',
                emotion: 'angry',
                dialogue: '失礼ですね...',
                translation: 'Qué falta de respeto...',
                choices: [],
                end: true,
                success: false
            },
            'node_fail_2': {
                id: 'node_fail_2',
                speaker: 'Tanaka-san',
                role: 'Director',
                emotion: 'annoyed',
                dialogue: '少し強引すぎますね。',
                translation: 'Es un poco demasiado agresivo.',
                choices: [],
                end: true,
                success: false
            },
            'node_success': {
                id: 'node_success',
                speaker: 'Tanaka-san',
                role: 'Director',
                emotion: 'happy',
                dialogue: 'いいですね。前向きに検討します。',
                translation: 'Muy bien. Lo consideraremos positivamente.',
                choices: [],
                end: true,
                success: true
            }
        }
    },
    {
        id: 'negotiation-ny',
        title: 'Contrato en New York',
        language: 'en',
        startNode: 'node_1',
        nodes: {
            'node_1': {
                id: 'node_1',
                speaker: 'Mr. Smith',
                role: 'VP',
                emotion: 'neutral',
                dialogue: 'Hi there. Thanks for coming. Let\'s get straight to business.',
                translation: 'Hola. Gracias por venir. Vayamos directo al grano.',
                choices: [
                    {
                        text: 'Oh, permítame invitarle un té primero y hablar del clima...',
                        subtext: '(Demasiado indirecto)',
                        nextId: 'node_fail_1',
                        confidenceChange: -15
                    },
                    {
                        text: 'Sure, Mr. Smith. I have the proposal ready.',
                        subtext: '(Directo / Eficiente)',
                        nextId: 'node_2',
                        confidenceChange: 15
                    }
                ]
            },
            'node_2': {
                id: 'node_2',
                speaker: 'Mr. Smith',
                role: 'VP',
                emotion: 'happy',
                dialogue: 'Excellent. What\'s your bottom line?',
                translation: 'Excelente. ¿Cuál es su precio final?',
                choices: [
                    {
                        text: 'Bueno, es complicado... depende de muchas cosas...',
                        subtext: '(Vago / Indeciso)',
                        nextId: 'node_fail_2',
                        confidenceChange: -20
                    },
                    {
                        text: 'We can do it for $50k, assuming a 6-month contract.',
                        subtext: '(Claro / Concreto)',
                        nextId: 'node_success',
                        confidenceChange: 20
                    }
                ]
            },
            'node_fail_1': {
                id: 'node_fail_1',
                speaker: 'Mr. Smith',
                role: 'VP',
                emotion: 'annoyed',
                dialogue: 'We don\'t have time for small talk.',
                translation: 'No tenemos tiempo para charlas.',
                choices: [],
                end: true,
                success: false
            },
            'node_fail_2': {
                id: 'node_fail_2',
                speaker: 'Mr. Smith',
                role: 'VP',
                emotion: 'angry',
                dialogue: 'I need straight answers. This isn\'t working.',
                translation: 'Necesito respuestas directas. Esto no funciona.',
                choices: [],
                end: true,
                success: false
            },
            'node_success': {
                id: 'node_success',
                speaker: 'Mr. Smith',
                role: 'VP',
                emotion: 'happy',
                dialogue: 'Done. You\'ve got yourself a deal.',
                translation: 'Hecho. Tenemos un trato.',
                choices: [],
                end: true,
                success: true
            }
        }
    }
];

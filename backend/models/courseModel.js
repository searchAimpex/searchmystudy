import mongoose from 'mongoose';
// import Province from './provinceModel';


const courseSchema = mongoose.Schema(
    {
        ProgramName: {
            type: String,
            required: true
        },
        University: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'University',
            required: true,
        },
        Province: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Province',
            default: null
            // required: true,
        },
        WebsiteURL: {
            type: String,
            required: true
        },

        Location: {
            type: String,
            required: true
        },
        Duration: {
            type: String,
            required: true
        },
        broucherURL: {
            type: String,
            default: ""
        },
        Category: {
            type: String,
            required: true,
            enum: [
                'Arts',
                'Accounts',
                'Finance',
                'Marketing',
                'Science',
                'Medical',
                'Computers',
                'Engineering',
                'Law',
                'Education',
                'Social Sciences',
                'Business Administration',
                'Psychology',
                'Economics',
                'Architecture',
                'Environmental Science',
                'Nursing',
                'Hospitality Management',
                'Media and Communication',
                'Information Technology',
                'Pharmacy',
                'Agriculture',
                'Design',
                'Public Health',
                'Mathematics',
                'Data Science',
                'Artificial Intelligence'
            ],
        },
        Intake: [
            {
                status: {
                    type: Boolean
                },
                date: {
                    type: String,
                    required: true
                },
                end_date: {
                    type: Date
                }
            }
        ],
        Scholarships: {
            type: Boolean,
            required: true
        },
        ProgramLevel: {
            type: String,
            required: true,
            enum: ['High School', 'UG Diploma/Cerificate/Associate Degree', 'UG', 'PG Diploma', 'PG', 'UG+PG(Accelerated)Degree', 'PhD', 'Foundation', 'Short Term Program', 'Pathway Program', 'Twiming Program(UG)', 'Twiming Program(PG)', 'Online Programe/Distance Learning'], // Define your enum values here
        },
        languageRequire: {
            english: {
                type: Boolean
            },
            motherTongue: {
                type: Boolean
            },
            no_any_preference: {
                type: Boolean
            }
        },
        LanguageRequirements: {
            PTE: {
                status: {
                    type: Boolean,
                    required: false
                },
                description: {
                    type: String,
                    required: false
                },
                minRequirement: {
                    type: String,
                    required: false
                }

            },
            TOFFL: {
                status: {
                    type: Boolean,
                    required: false
                },
                description: {
                    type: String,
                    required: false
                },
                minRequirement: {
                    type: String,
                    required: false
                }

            },
            IELTS: {
                status: {
                    type: Boolean,
                    required: false
                },
                description: {
                    type: String,
                    required: false
                },
                minRequirement: {
                    type: String,
                    required: false
                }
            },
            DET: {
                status: {
                    type: Boolean,
                    required: false
                },
                description: {
                    type: String,
                    required: false
                },
                minRequirement: {
                    type: String,
                    required: false
                }
            }
        },
        Eligibility: {
            type: String,
            required: true
        },
        StandardizeRequirement: {
            SAT: {
                status: {
                    type: Boolean,
                    required: false
                },
                description: {
                    type: String,
                    required: false
                },
                minRequirement: {
                    type: String,
                    required: false
                }
            },
            ACT: {
                status: {
                    type: Boolean,
                    required: false
                },
                description: {
                    type: String,
                    required: false
                },
                minRequirement: {
                    type: String,
                    required: false
                }
            },
            GRE: {
                status: {
                    type: Boolean,
                    required: false
                },
                description: {
                    type: String,
                    required: false
                },
                minRequirement: {
                    type: String,
                    required: false
                }
            },
            GMAT: {
                status: {
                    type: Boolean,
                    required: false
                },
                description: {
                    type: String,
                    required: false
                },
                minRequirement: {
                    type: String,
                    required: false
                }
            }

        },
        Fees: {
            mode: {
                type: String,
                enum: ["semester", "year", "total"],
                required: true
            },
            currency: {
                type: String,
                default: "USD"
            },
            breakdown: [
                {
                    label: {
                        type: String, // e.g. "Semester 1", "Semester 2", "Year 1", "Year 2"
                        required: true
                    },
                    amount: {
                        type: Number,
                        required: true
                    }
                }
            ],
            totalAmount: {
                type: Number // optional if you want a total value
            }
        },
        completeFees:{
            currency:{
                type:"String"
            },
            amount:{
                type:String
            }
        }

    },
    {
        timestamps: true,
    }
);

const Course = mongoose.model('Course', courseSchema);

export default Course;

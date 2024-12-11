import mongoose from 'mongoose';


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
            default:""
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
                    type: Boolean,
                    required: true
                },
                date: {
                    type: String,
                    required: true
                },
                expiresAt: {
                    type: Date, // Add this field for TTL
                    required: true,
                    index: { expires: 0 }, // TTL index to expire the document at this date
                },
            }
        ],
        Scholarships: {
            type: Boolean,
            required: true
        },
        ProgramLevel: {
            type: String,
            required: true,
            enum: ['High School', 'UG Diploma/Cerificate/Associate Degree', 'UG', 'PG Diploma', 'PG','UG+PG(Accelerated)Degree','PhD','Foundation','Short Term Program','Pathway Program','Twiming Program(UG)','Twiming Program(PG)','Online Programe/Distance Learning'], // Define your enum values here
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
                minRequirement : {
                    type: String,
                    required: false
                }

            },
            TOFFL:{
                status: {
                    type: Boolean,
                    required: false
                },
                description: {
                    type: String,
                    required: false
                },
                minRequirement : {
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
                minRequirement : {
                    type: String,
                    required: false
                }
            },
            DET:{
                status: {
                    type: Boolean,
                    required: false
                },
                description: {
                    type: String,
                    required: false
                },
                minRequirement : {
                    type: String,
                    required: false
                }
            }
        },
        StandardizeRequirement:{
            SAT : {
                status: {
                    type: Boolean,
                    required: false
                },
                description: {
                    type: String,
                    required: false
                },
                minRequirement : {
                    type: String,
                    required: false
                }
            },
            ACT : {
                status: {
                    type: Boolean,
                    required: false
                },
                description: {
                    type: String,
                    required: false
                },
                minRequirement : {
                    type: String,
                    required: false
                }
            },
            GRE : {
                status: {
                    type: Boolean,
                    required: false
                },
                description: {
                    type: String,
                    required: false
                },
                minRequirement : {
                    type: String,
                    required: false
                }
            },
            GMAT : {
                status: {
                    type: Boolean,
                    required: false
                },
                description: {
                    type: String,
                    required: false
                },
                minRequirement : {
                    type: String,
                    required: false
                }
            }

        },
        Fees: {
            type: Number,
            default:0
        }
    },
    {
        timestamps: true,
    }
);

const Course = mongoose.model('Course', courseSchema);

export default Course;

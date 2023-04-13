import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  ButtonGroup,
  Modal,
  ModalFooter,
  ModalHeading,
  ModalOpenLink,
  ModalRef,
  ModalToggleButton,
} from '@trussworks/react-uswds'
import { RadioField } from 'components/form/fields/RadioField/RadioField'
import TextField from 'components/form/fields/TextField/TextField'
import { YesNoQuestion } from 'components/form/fields/YesNoQuestion/YesNoQuestion'
import { SectionHeading } from 'components/form/SectionHeading/SectionHeading'
import { PageLayout } from 'components/PageLayout/PageLayout'
import i18n from 'i18n/i18n'
import { MouseEventHandler, useRef } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { object } from 'yup'

const tIdentity = i18n.getFixedT(null, 'pages', 'identity')

const workAuthorizationTypeOptions = [
  'usCitizenOrNational',
  'permanentResident',
  'h1bVisa',
  'employmentAuthorizationDocument',
  'notLegallyAllowedToWorkInUS',
] as const
type WorkAuthorizationTypeOption = (typeof workAuthorizationTypeOptions)[number]

const workAuthorizationTypeRadioOptions = workAuthorizationTypeOptions.map(
  (option) => ({
    label: tIdentity(`questions.workAuthorizationType.options.${option}`),
    value: option,
  })
)

type IdentityValues = {
  dateOfBirth?: string
  ssn?: string
  hasDriversLicenseOrStateId?: boolean
  driversLicenseOrStateIdNumber?: string
  workAuthorizationType?: WorkAuthorizationTypeOption
  immigrationDocumentFirstName?: string
  immigrationDocumentMiddleInitial?: string
  immigrationDocumentLastName?: string
  hasUscisOrAlienRegistrationNumber?: boolean
  uscisOrAlienRegistrationNumber?: string
  confirmUscisOrAlienRegistrationNumber?: string
  countryOfOrigin?: string // TODO: enumerate
  immigrationDocumentIssueDate?: string
  immigrationDocumentExpirationDate?: string
}

const defaultValues: IdentityValues = {
  dateOfBirth: undefined,
  ssn: undefined,
  hasDriversLicenseOrStateId: undefined,
  driversLicenseOrStateIdNumber: undefined,
  workAuthorizationType: undefined,
  immigrationDocumentFirstName: undefined,
  immigrationDocumentMiddleInitial: undefined,
  immigrationDocumentLastName: undefined,
  hasUscisOrAlienRegistrationNumber: undefined,
  uscisOrAlienRegistrationNumber: undefined,
  confirmUscisOrAlienRegistrationNumber: undefined,
  countryOfOrigin: undefined,
  immigrationDocumentIssueDate: undefined,
  immigrationDocumentExpirationDate: undefined,
}

const validationSchema = object().shape({})

type IdentityPageProps = {
  importedDateOfBirth?: string
  importedSsn?: string
}

export const Identity = ({
  importedDateOfBirth, // TODO if not imported, show field
  importedSsn, // TODO if not imported, show field
}: IdentityPageProps) => {
  const { t } = useTranslation('pages', { keyPrefix: 'identity' })

  const hookFormMethods = useForm<IdentityValues>({
    defaultValues: {
      ...defaultValues,
      dateOfBirth: importedDateOfBirth || defaultValues.dateOfBirth,
      ssn: importedSsn || defaultValues.ssn,
    },
    resolver: yupResolver(validationSchema),
  })
  const { handleSubmit, watch } = hookFormMethods

  const modalRef = useRef<ModalRef>(null)
  const onSubmit: SubmitHandler<IdentityValues> = (data) => {
    console.log(data)
  }

  const hasDriversLicenseOrStateId = watch('hasDriversLicenseOrStateId')
  const workAuthorizationType = watch('workAuthorizationType')

  const handleImmigrationHelpLinkClick: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    if (modalRef && modalRef.current) {
      window.open(
        'https://www.immigrationhelp.org/learning-center/what-is-an-alien-registration-number/'
      )
      modalRef.current.toggleModal()
    }
  }

  const immigrationHelpModal = (
    <Modal
      ref={modalRef}
      id="alien-registration-number-link-modal"
      aria-labelledby="alien-registration-number-link-modal-heading"
      aria-describedby="alien-registration-number-link-modal-description"
    >
      <ModalHeading id="alien-registration-number-link-modal-heading">
        {t('immigrationHelpModal.heading')}
      </ModalHeading>
      <ModalFooter>
        <ButtonGroup>
          <Button
            type="button"
            name="immigrationHelpLink"
            onClick={handleImmigrationHelpLinkClick}
          >
            {t('immigrationHelpModal.continue')}
          </Button>
          <ModalToggleButton
            modalRef={modalRef}
            closer
            unstyled
            className="padding-105 text-center"
          >
            {t('immigrationHelpModal.cancel')}
          </ModalToggleButton>
        </ButtonGroup>
      </ModalFooter>
    </Modal>
  )

  return (
    <PageLayout heading={t('heading')}>
      <FormProvider {...hookFormMethods}>
        {/* TODO: VerifiedFields */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {immigrationHelpModal}
          <YesNoQuestion
            name="hasDriversLicenseOrStateId"
            question={t('questions.hasDriversLicenseOrStateId.label')}
          />
          {hasDriversLicenseOrStateId && (
            <TextField
              name="driversLicenseOrStateIdNumber"
              label={t('questions.driversLicenseOrStateIdNumber.label')}
              type="text"
            />
          )}
          <RadioField
            name="workAuthorizationType"
            legend={t('questions.workAuthorizationType.label')}
            options={workAuthorizationTypeRadioOptions}
          />

          {workAuthorizationType &&
            workAuthorizationType !== 'usCitizenOrNational' && (
              <>
                <SectionHeading>
                  {t('immigrationDocumentSectionTitle')}
                </SectionHeading>
                <TextField
                  name="immigrationDocumentFirstName"
                  label={t('questions.immigrationDocumentFirstName.label')}
                  type="text"
                />
                <TextField
                  name="immigrationDocumentMiddleInitial"
                  label={t('questions.immigrationDocumentMiddleInitial.label')}
                  type="text"
                />
                <TextField
                  name="immigrationDocumentLastName"
                  label={t('questions.immigrationDocumentLastName.label')}
                  type="text"
                />
                <YesNoQuestion
                  name="hasUscisOrAlienRegistrationNumber"
                  question={t(
                    'questions.hasUscisOrAlienRegistrationNumber.label'
                  )}
                  hint={
                    <Trans
                      t={t}
                      i18nKey="questions.hasUscisOrAlienRegistrationNumber.hint"
                    >
                      <ModalOpenLink
                        modalRef={modalRef}
                        href="https://www.immigrationhelp.org/learning-center/what-is-an-alien-registration-number/"
                      >
                        Need help finding it?
                      </ModalOpenLink>
                    </Trans>
                  }
                />
                <TextField
                  name="uscisOrAlienRegistrationNumber"
                  label={t('questions.uscisOrAlienRegistrationNumber.label')}
                  type="text"
                />
                <TextField
                  name="confirmUscisOrAlienRegistrationNumber"
                  label={t(
                    'questions.confirmUscisOrAlienRegistrationNumber.label'
                  )}
                  type="text"
                />
                {/* TODO: DropdownField */}
                {/* TODO Valid from/issued on */}
                {/* TODO Expiration date */}
              </>
            )}

          {/* TODO: FormPaginationButtons */}
          <Button type="submit">Next</Button>
        </form>
      </FormProvider>
    </PageLayout>
  )
}
